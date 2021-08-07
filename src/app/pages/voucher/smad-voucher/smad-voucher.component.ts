import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CategorySearchComponent } from 'src/app/partial/modals/category-search/category-search.component';
import { GetDataService } from '../../../service/get-data.service';
import { Plugins, } from '@capacitor/core';
import { Router } from '@angular/router';
const { Device, Geolocation } = Plugins;

@Component({
  selector: 'app-smad-voucher',
  templateUrl: './smad-voucher.component.html',
  styleUrls: ['./smad-voucher.component.scss'],
})
export class SmadVoucherComponent implements OnInit {

  categorydata = [];
  categorydata1 = [];
  lat: number;
  long: number;
  transferMsg: any;
  smtoken: any;
  inp;
  datain;
  success;
  mobileno;
  filtereditems;
  items: any = [];
  categoryNameRecd = 'Category';
  categoryIdRecd;
  cmPartnerId: any;
  isFilterd = false;
  pointcolor = 'var(--theme-color)';
  vouchers: any = [
  ];
  imgArr = [];
  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    autoplay: true
  };

  constructor(
    private alertController: AlertController,
    public modalController: ModalController,
    private DataService: GetDataService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getcategories();
    this.getLocation();
    this.cmPartnerId = localStorage.getItem('cmPartnerId');
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    // this.lat = position.coords.latitude;
    // this.long = position.coords.longitude;
    this.lat = 19.267040;
    this.long = 72.876617;
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');

    this.httpserv();
  }

  httpserv() {
    this.inp = {
      reqid: 40975025,
      lat: this.lat,
      long: this.long,
      mobileno: this.mobileno,
      smtoken: this.smtoken
    };
    this.DataService.getDetails(this.inp)
      .subscribe(res => {
        this.datain = res;
        this.vouchers = this.datain.voucher_data;
        this.imgArr = this.datain.slider_data;
        this.items = this.datain.voucher_data;
        // this.vouchers = this.datain.voucher_data;
        this.success = + this.datain.Success;
        this.getcategories();
      }, error => {
        alert('http err');
      });
  }

  async openAddress(title, data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: data ? data : '-',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        },
      ]
    });
    await alert.present();
  }

  getcategories() {
    // tslint:disable-next-line: prefer-for-of
    if (this.items && this.items.length) {
      for (let i = 0; i < this.items.length; i++) {
        const obj = {
          name: this.items[i].categoryName,
          icon: this.items[i].categoryIcon
        };
        this.categorydata1.push(obj);
        this.categorydata = this.remove_duplicates(this.categorydata1);
      }
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


  async filterCategory() {
    ModalController;
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
    this.categoryNameRecd = d.data.categoryNameRecd.name;
    if (this.categoryNameRecd !== 'Category') {
      this.isFilterd = true;
      if (this.filtereditems && this.filtereditems.length) {
        this.filtereditems = this.items.filter((item) => {
          return (item.categoryName === this.categoryNameRecd);
        });
      }
    } else {
      this.isFilterd = false;
    }
  }

  async redeemVoucher(id) {
    this.inp = {
      reqid: 40975026,
      mobileno: this.mobileno,
      smtoken: this.smtoken,
      voucher_id: id
    };
    this.DataService.getDetails(this.inp)
      .subscribe(async (res) => {
        this.datain = res;
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: this.datain.title,
          message: this.datain.message,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
              }
            },
          ]
        });
        await alert.present();
        this.httpserv();
      }, error => {
        alert('http err');
      });
  }

  clearFilter() {
    this.isFilterd = false;
    this.vouchers = this.items;
    this.categoryNameRecd = 'Category';
  }

  openMyVochers(){
    this.router.navigate(['/my-voucher']);
  }
}
