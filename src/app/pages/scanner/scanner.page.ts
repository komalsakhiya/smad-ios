import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/service/toast.service';
import { GetDataService } from '../../service/get-data.service';
import { ViewCountComponent } from '../account/myads/view-count/view-count.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  data: any;
  lat: number;
  long: number;
  transferMsg: any;
  inp;
  datain;
  success;
  mobileno = localStorage.getItem('mobileno');
  smtoken = localStorage.getItem('smtoken');
  vouchers: any = [];
  items: any = [];
  previousUrl;
  currentUrl;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController,
    public modalController: ModalController,
    private DataService: GetDataService,
    private toatService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpserv();
  }

  httpserv() {
    this.inp = {
      reqid: 40975028,
      mobileno: this.mobileno,
      smtoken: this.smtoken
    };
    this.DataService.getDetails(this.inp)
      .subscribe((res: any) => {
        if (res.Success == '1') {
          this.datain = res;
          this.vouchers = this.datain.vendor_voucher_data;
          this.success = + this.datain.Success;
        }
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
  async usedVoucher(id) {
    this.inp = {
      reqid: 40975029,
      mobileno: this.mobileno,
      smtoken: this.smtoken,
      voucher_id: id
    };
    this.DataService.getDetails(this.inp)
      .subscribe(async (res) => {
        this.datain = res;
        if (this.datain.Success === '1') {
          const modal = await this.modalController.create({
            component: ViewCountComponent,
            componentProps: {
              viewData: this.datain.used_voucher_data
            }
          });
          return await modal.present();
        }
        this.httpserv();
      }, error => {
        alert('http err');
      });
  }

  async scan() {
    const alert = await this.alertController.create({
      // cssClass: 'change-design-alert',
      header: 'Scan',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Voucher Code',
          value: 'value1',
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Open code scanner',
          value: 'value2'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            if (data === 'value1') {
              this.voucherCode();
            } else {
              this.scanQR();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();

  }
  async voucherCode() {
    const alert = await this.alertController.create({
      cssClass: 'voucher-input-alert',
      header: 'Voucher Code',
      inputs: [
        {
          name: 'code',
          type: 'text',
          placeholder: 'Enter Code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.httpserve(data.code);

          }
        }
      ]
    });

    await alert.present();
  }

  scanQR() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.data = barcodeData;
      this.httpserve(this.data.text);
    }).catch(err => {
      this.toatService.presentToast('Error in scan qr code');
    });
  }

  httpserve(code) {
    this.inp = {
      reqid: 40975030,
      mobileno: this.mobileno,
      smtoken: this.smtoken,
      voucher_code: code
    };
    this.DataService.getDetails(this.inp)
      .subscribe(async (res) => {
        this.datain = res;
        if (this.datain.Success === '1') {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Scanner',
            message: this.datain.message ? this.datain.message : '-',
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
        this.httpserv();
      }, error => {
        alert('http err');
      });
  }

  addTicket() {
    this.router.navigate(['help-desk/add-ticket'], {
      state: {
        data: [{ 0: '0', 1: 'Support', ticketTypeId: '0', ticketType: 'Support' }
          , { 0: '1', 1: 'Sales', ticketTypeId: '1', ticketType: 'Sales' }], subject: 'Issue regarding cashmash'
      }
    });
  }

}
