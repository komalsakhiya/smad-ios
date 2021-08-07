import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { EventService } from '../../service/event.service';
import { ToastService } from '../../service/toast.service';
import { GetDataService } from '../../service/get-data.service';
import { CategorySearchComponent } from '../../partial/modals/category-search/category-search.component';
import { Plugins, } from '@capacitor/core';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  img = 'assets/images/CashMash-TextIcon.png';
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  mobileno;
  smuserid;
  lat: number;
  long: number;
  transferMsg: any;
  smtoken: any;
  inp;
  datain;
  success;
  items;
  filtereditems;
  areaid;
  areaname;
  pageno = 0;
  intro = 0;
  animateItems = [];
  infinitescr = 1;
  categorydata = [];
  categorydata1 = [];
  pointtype = 0;
  favcolor = 'disabled';
  pointcolor = '#5741a5';
  categoryNameRecd = 'Category';
  categoryIdRecd;
  datafmmpfav;
  datafmmppoint;
  isFilterd = false;
  isLikedDisplay = false;
  out: any;
  openingData: any;
  isOverlayImgDisplay = false;
  loading = false;
  constructor(
    private DataService: GetDataService,
    public alertController: AlertController,
    public modalController: ModalController,
    public loadingController: LoadingController,
    private router: Router,
    public events: EventService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.smuserid = localStorage.getItem('smuserid');
    this.intro = history.state.intro;
    this.transferMsg = history.state.transferMsg;
    if (this.transferMsg) {
      this.presentAlert('Success!!', this.transferMsg);
    }
    this.transferMsg = '';
    const options = {
      enableHighAccuracy: true
    };
    this.getUserDetail();
    // this.getLocation();
  }

  getUserDetail() {
    this.mobileno = localStorage.getItem('mobileno');
    this.loading = false;
    if (this.mobileno) {
      this.smtoken = localStorage.getItem('smtoken');
      this.inp = {
        reqid: 40975003,
        smtoken: this.smtoken,
        appversion: '1.0.0'
      };
      this.DataService.getDetails(this.inp)
        .subscribe((res: any) => {
          if (res && res.newsmtoken) {
            this.openingData = res;
            // localStorage.setItem('smtoken', res.newsmtoken);
            // localStorage.setItem('custid', res.custid);
            localStorage.setItem('userdetails', JSON.stringify(res));
            localStorage.setItem('smtoken', res.newsmtoken);
            localStorage.setItem('block', res.block);
            localStorage.setItem('custid', res.custid);
            localStorage.setItem('cmpartner_id', res.cmpartner_id);
            // localStorage.setItem('cname', res.cname);
            localStorage.setItem('email', res.email);
            localStorage.setItem('guide', res.guide);
            localStorage.setItem('marketerid', res.marketerid);
            localStorage.setItem('showImage', res.showImage);
            localStorage.setItem('updatetype', res.updatetype);
            this.mobileno = localStorage.getItem('mobileno');
            this.smtoken = localStorage.getItem('smtoken');
            if (this.openingData.showImage == 1 && this.openingData.overlap_url) {
              this.isOverlayImgDisplay = true;
            }
            if (localStorage.getItem('guide') == '1') {
              this.router.navigate(['tour-guide']);
            }
            this.events.publish('notiCountEvent', { count: res.noti });
            this.events.publish('sidebar');
            this.getLocation();
          }
        }, error => {
          alert('http err');
        });
    }
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
    this.lat = 19.267040;
    this.long = 72.876617;
    this.inp = {
      reqid: 40975005,
      smuserid: this.smuserid,
      lat: this.lat,
      long: this.long,
      premium: 0,
      mobileno: this.mobileno,
      smtoken: this.smtoken
    };
    this.httpserv();
  }
  async presentAlert(hdr, subhdr) {
    const alert = await this.alertController.create({
      header: hdr,
      subHeader: subhdr,
      buttons: ['OK']
    });
    await alert.present();
  }
  async httpserv() {
    this.loading = true;
    this.DataService.getDetails(this.inp)
      .subscribe(data => {
        this.datain = data;
        this.loading = false;
        this.success = + this.datain.Success;
        if (this.success === 1) {
          this.items = this.datain.ads;
          this.filtereditems = this.datain.ads;
          this.getcategories();
          this.animtitms();
        }
        if ((this.success === 1 || this.success === 0)) {
          this.areaid = this.datain.areaid;
          this.areaname = this.datain.areaname;
        } else {
          this.areaid = 0;
          this.areaname = 0;
        }
      }, error => {
        alert('http err');
        this.loading = false;
        this.toastService.presentToast(error);
      });
  }
  animtitms() {
    for (let i = this.pageno * 18; i < this.pageno * 18 + 18; i++) {
      if (this.animateItems && this.filtereditems &&
        this.animateItems.length === this.filtereditems.length) { this.infinitescr = 0; break; }
      if (this.filtereditems) { this.animateItems.push(this.filtereditems[i]); }
      if (this.animateItems && this.filtereditems &&
        this.animateItems.length === this.filtereditems.length) { this.infinitescr = 0; break; }
    }
  }
  getcategories() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.items.length; i++) {
      const obj = {
        name: this.items[i].categoryName,
        icon: this.items[i].categoryIcon
      };
      this.categorydata1.push(obj);
      this.categorydata = this.remove_duplicates(this.categorydata1);
    }
  }
  remove_duplicates(arr) {
    const obj = {};
    const retarr = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i].name] = arr[i];
    }
    // tslint:disable-next-line: forin
    for (const key in obj) {
      retarr.push(obj[key]);
    }
    return retarr;
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
      this.pointcolor = 'var(--dark-green-color)';
    } else {
      this.pointtype = 0;
      this.pointcolor = '#5741a5';
    }
    this.commonfilter();
  }
  commonfilter(type?) {
    this.isFilterd = true;
    this.isLikedDisplay = false;
    if (this.pointtype === 0) {
      this.filtereditems = this.items;
      this.isFilterd = true;
    }
    if (this.pointtype === 1) {
      if (this.filtereditems && this.filtereditems.length) {
        this.filtereditems = this.items.filter((item) => {
          return item.points > 0;
        });
      }
      this.isFilterd = true;
    }
    if (this.categoryNameRecd !== 'Category') {
      if (this.filtereditems && this.filtereditems.length) {
        this.filtereditems = this.items.filter((item) => {
          return (item.categoryName === this.categoryNameRecd);
        });
      }
    } else {
      this.isFilterd = false;
    }
    if (type) {
      if (this.filtereditems && this.filtereditems.length) {
        this.filtereditems = this.items.filter((item) => {
          return (item.fav_sts == '1');
        });
      }
      this.isLikedDisplay = true;
      this.isFilterd = true;
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

  filterFavourite() {
    this.commonfilter('fav');
  }

  handleModalDismiss(d) {
    this.categoryNameRecd = d.data.categoryNameRecd.name;
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

  navigatetoDetails(data) {
    this.router.navigate(['/home/details'], { state: { addetails: data, timerrun: 1 } });
  }
  clearFilter() {
    this.isFilterd = false;
    this.isLikedDisplay = false;
    this.filtereditems = this.items;
    this.categoryNameRecd = 'Category';
    this.animateItems = [];
    this.pageno = 0;
    this.infinitescr = 1;
    this.animtitms();
  }

  closeOverlayImg() {
    this.isOverlayImgDisplay = false;
  }
}
