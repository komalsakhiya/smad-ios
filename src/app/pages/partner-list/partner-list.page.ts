import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GetDataService } from '../../service/get-data.service';
import { Plugins, } from '@capacitor/core';
import { CategorySearchComponent } from 'src/app/partial/modals/category-search/category-search.component';
const { Device, Geolocation } = Plugins;
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.page.html',
  styleUrls: ['./partner-list.page.scss'],
})
export class PartnerListPage implements OnInit {

  categorydata = [];
  categorydata1 = [];
  smtoken: any;
  inp;
  datain;
  success;
  mobileno;
  lat;
  long;
  items: any = [];
  categoryNameRecd = 'Category';
  categoryIdRecd;
  isFilterd = false;
  filtereditems;
  pointcolor = 'var(--theme-color)';
  vouchers: any = [

  ];
  imgArr = [];
  slideOpts = {
    initialSlide: 0,
    speed: 1000,
    autoplay: true
  };

  myInputs: any;
  testRadioOpen;
  testRadioResult;
  constructor(
    private alertController: AlertController,
    public modalController: ModalController,
    private DataService: GetDataService,
    private callNumber: CallNumber,
  ) { }

  ngOnInit() {
    this.getLocation()
  }

  async openAddress(title, data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: data ? data : '-',
      buttons: [
      ]
    });
    await alert.present();
  }

  async getLocation() {
    // const position = await Geolocation.getCurrentPosition();
    // this.lat = position.coords.latitude;
    // this.long = position.coords.longitude;
    this.lat = 19.267040;
    this.long = 72.876617;
    this.inp = {
      reqid: 40975031,
      mobileno: localStorage.getItem('mobileno'),
      smtoken: localStorage.getItem('smtoken'),
      lat: this.lat,
      long: this.long,
    };
    this.httpserv();
  }

  httpserv() {
    this.DataService.getDetails(this.inp)
      .subscribe((res: any) => {
        if (res.Success == 1) {
          this.datain = res;
          this.vouchers = this.datain.cashback_data;
          this.items = this.datain.cashback_data;
          this.imgArr = this.datain.slider_data;
          this.success = + this.datain.Success;
          this.getcategories();
        }
      }, error => {
        alert('http err');
      });
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


  clearFilter() {
    this.isFilterd = false;
    this.vouchers = this.items;
    this.categoryNameRecd = 'Category';
  }

  parseFloatPercentage(percentage) {
    return parseFloat(percentage);
  }

  createInputs(data) {
    const theNewInputs = [];
    const myArray = [];
    myArray.push(data.mobile1, data.mobile2);
    for (let i = 0; i < myArray.length; i++) {
      theNewInputs.push(
        {
          name: 'radio' + i,
          type: 'radio',
          label: 'Mobile ' + [i + 1],
          value: myArray[i],
          checked: i === 0 ? true : false
        },
      );
    }
    return theNewInputs;
  }

  async call(data) {
    if (data.mobile2 === '') {
      this.testRadioOpen = false;
      this.testRadioResult = data.mobile1;
      // call
      this.callNumber.callNumber(this.testRadioResult, false)
        .then(() => console.log('Launched dialer!', this.testRadioResult))
        .catch(() => console.log('Error launching dialer', this.testRadioResult));
    } else {
      this.myInputs = this.createInputs(data);
      const alert = await this.alertController.create({
        header: 'Radio',
        inputs: this.myInputs,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          }, {
            text: 'CALL',
            handler: result => {
              this.testRadioOpen = false;
              this.testRadioResult = result;
              // call
              this.callNumber.callNumber(this.testRadioResult, false)
                .then(() => console.log('Launched dialer!', this.testRadioResult))
                .catch(() => console.log('Error launching dialer', this.testRadioResult));
            }
          }
        ]
      });

      await alert.present();
    }
  }

}
