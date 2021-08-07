import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { QrCodeComponent } from 'src/app/partial/modals/qr-code/qr-code.component';
import { GetDataService } from '../../../service/get-data.service';
import { Plugins, } from '@capacitor/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
const { Device, Geolocation } = Plugins;

@Component({
  selector: 'app-my-voucher',
  templateUrl: './my-voucher.component.html',
  styleUrls: ['./my-voucher.component.scss'],
})
export class MyVoucherComponent implements OnInit {
  lat: number;
  long: number;
  transferMsg: any;
  smtoken: any;
  inp;
  datain;
  success;
  mobileno;
  myInputs: any;
  vouchers: any = [
  ];
  testRadioOpen;
  testRadioResult;
  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private DataService: GetDataService,
    private callNumber: CallNumber,
  ) { }

  ngOnInit() {
    this.getLocation();
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    // this.lat = position.coords.latitude;
    // this.long = position.coords.longitude;
    this.lat = 19.267040;
    this.long = 72.876617;
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.inp = {
      reqid: 40975027,
      lat: this.lat,
      long: this.long,
      mobileno: this.mobileno,
      smtoken: this.smtoken
    };
    this.httpserv();
  }

  httpserv() {
    this.DataService.getDetails(this.inp)
      .subscribe(res => {
        this.datain = res;
        if (this.datain.Success == 1) {
          this.vouchers = this.datain.my_voucher_data;
        }
      }, error => {
        alert('http err');
      });
  }

  async viewQRCode(data) {
    const modal = await this.modalController.create({
      component: QrCodeComponent,
      componentProps: {
        qrData: data
      }
    });
    return await modal.present();
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
