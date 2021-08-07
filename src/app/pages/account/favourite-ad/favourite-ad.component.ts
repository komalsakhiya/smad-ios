import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { CategorySearchComponent } from 'src/app/partial/modals/category-search/category-search.component';
import { EventService } from 'src/app/service/event.service';
import { GetDataService } from 'src/app/service/get-data.service';

@Component({
  selector: 'app-favourite-ad',
  templateUrl: './favourite-ad.component.html',
  styleUrls: ['./favourite-ad.component.scss'],
})
export class FavouriteAdComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  mobileno;
  smuserid;
  smtoken: any;
  inp;
  datain;
  success;
  items;
  filtereditems;
  pageno = 0;
  animateItems = [];
  infinitescr = 1;
  categorydata = [];
  categorydata1 = [];
  pointtype = 0;
  favcolor = 'disabled';
  pointcolor = 'var(--light-red-color)';
  categoryNameRecd = 'Category';
  categoryIdRecd;
  datafmmpfav;
  datafmmppoint;

  constructor(
    private DataService: GetDataService,
    public alertController: AlertController,
    public modalController: ModalController,
    public loadingController: LoadingController,
    private router: Router,
    public events: EventService) { }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.smuserid = localStorage.getItem('smuserid');
    this.inp = {
      reqid: 40975009,
      smuserid: this.smuserid,
      mobileno: this.mobileno,
      smtoken: this.smtoken
    };
    this.httpserv();
  }
  async httpserv() {
    this.DataService.getDetails(this.inp)
      .subscribe(data => {
        this.datain = data;
        this.success = + this.datain.Success;
        if (this.success === 1) {
          this.items = this.datain.ads;
          this.filtereditems = this.datain.ads;
          this.getcategories();
          this.animtitms();
        }
      }, error => {
        alert('http err');
      });
  }
  animtitms() {
    for (let i = this.pageno * 18; i < this.pageno * 18 + 18; i++) {
      if (
        this.animateItems && this.filtereditems &&
        this.animateItems.length === this.filtereditems.length) { this.infinitescr = 0; break; }
      if (this.filtereditems) { this.animateItems.push(this.filtereditems[i]); }
      if (this.animateItems && this.filtereditems &&
        this.animateItems.length === this.filtereditems.length) { this.infinitescr = 0; break; }
    }
  }
  getcategories() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.items.length; i++) {
      this.categorydata1.push(this.items[i].categoryName);
      this.categorydata = this.remove_duplicates(this.categorydata1);
    }
  }
  remove_duplicates(arr) {
    const obj = {};
    const retarr = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    // tslint:disable-next-line: forin
    for (const key in obj) {
      retarr.push(key);
    }
    return retarr;
  }
  navigatetoDetails(data) {
    this.router.navigate(['/home/details'], { state: { addetails: data, timerrun: 1 } });
  }
  stopBubbling(evt) {
    evt.stopPropagation();
    evt.cancelBubble = true;
  }
  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.pageno = this.pageno + 1;
      this.animtitms();
      infiniteScroll.target.complete();
    }, 500);
  }
  adenquiry(): void {
    this.router.navigate(['enquiry'], { state: { bookingId: 0, businessId: 0 } });
  }
  filterPointItems(type) {
    if (type === 0) {
      this.pointtype = 1;
      this.pointcolor = 'var(--red-color)';
    } else {
      this.pointtype = 0;
      this.pointcolor = 'var(--light-red-color)';
    }
    this.commonfilter();
  }
  commonfilter() {
    if (this.pointtype === 0) {
      this.filtereditems = this.items;
    }
    if (this.pointtype === 1 && this.items && this.items.length) {
      this.filtereditems = this.items.filter((item) => {
        return item.points > 0;
      });
    }
    if (this.categoryNameRecd !== 'Category' && this.filtereditems && this.filtereditems.length) {
      this.filtereditems = this.filtereditems.filter((item) => {
        return (item.categoryName === this.categoryNameRecd);
      });
    }
    this.animateItems = [];
    this.pageno = 0;
    this.infinitescr = 1;
    this.animtitms();
  }
  async filterCategory() {
    const modal = await this.modalController.create({
      component: CategorySearchComponent,
      componentProps: {
        categorydata: this.categorydata, categoryNameRecd: this.categoryNameRecd
      }
    });
    modal.onDidDismiss().then((d: any) => this.handleModalDismiss(d));
    return await modal.present();
  }
  handleModalDismiss(d) {
    this.categoryNameRecd = d.data.categoryNameRecd;
    this.commonfilter();
  }
  ionViewDidEnter() {
    this.events.subscribe('favevent', (data) => {
      this.datafmmpfav = data;
      if (this.datafmmpfav.frm === 'mp') {
        this.items.find(item => item.adsId === this.datafmmpfav.data1.adsId).fav_sts = this.datafmmpfav.data1.fav_sts;
        this.filtereditems.find(item => item.adsId === this.datafmmpfav.data1.adsId).fav_sts = this.datafmmpfav.data1.fav_sts;
      }
    });
    this.events.subscribe('pointevent', (data) => {
      this.datafmmppoint = data;
      if (this.datafmmppoint.frm === 'mp') {
        this.items.find(item => item.adsId === this.datafmmppoint.data1.adsId).points = 0;
        this.filtereditems.find(item => item.adsId === this.datafmmppoint.data1.adsId).points = 0;
      }
    });
  }

}
