import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GetDataService } from '../../service/get-data.service';


@Component({
  selector: 'app-cmtransactions',
  templateUrl: './cmtransactions.page.html',
  styleUrls: ['./cmtransactions.page.scss'],
})
export class CmtransactionsPage implements OnInit {

  type = '0';
  pointsbalance = 0;
  items;
  filtereditems;
  mobileno;
  inp;
  smuserid;
  smtoken;
  notitype = '0';
  datain;
  custid;
  out;
  todo;
  msg;
  title: string;
  subtitle: string;
  pointsredeem;
  redeem = 1;
  inptest;
  paiditems: any = [];
  receiveditems: any = [];
  month: number = 3;

  constructor(private DataService: GetDataService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.mobileno = localStorage.getItem('mobileno');
    this.smuserid = localStorage.getItem('smuserid');
    this.smtoken = localStorage.getItem('smtoken');
    this.custid = localStorage.getItem('custid');
    this.pgload();
  }
  pgload() {
    this.inp = {
      reqid: 40975017,
      smuserid: this.smuserid,
      mobileno: this.mobileno,
      month: this.month,
      smtoken: this.smtoken,
    };
    this.httpserv();
  }
  filterPointItems(type) {
    if (type === '0') {
      this.filtereditems = this.items;
    }
    if (type === '1') {
      if (this.items && this.items.length) {
        this.filtereditems = this.items.filter((item) => {
          return item.subscriberTo === this.smuserid;
        });
      }
    }
    if (type === '2') {
      if (this.items && this.items.length) {
        this.filtereditems = this.items.filter((item) => {
          return item.subscriberFrom === this.smuserid;
        });
      }
    }
    this.notitype = type;
  }
  async httpserv() {
    this.DataService.getDetails(this.inp)
      .subscribe(res => {
        this.datain = res;
        this.items = this.datain.transactions;
        this.filtereditems = this.items;
        this.pointsbalance = this.datain.pointsbalance;
        if (this.items && this.items.length) {
          this.receiveditems = this.items.filter((item) => {
            return item.subscriberTo == this.smuserid;
          });
          this.paiditems = this.items.filter((item) => {
            return item.subscriberFrom == this.smuserid;
          });
        }
      }, error => {
        alert('http err');
      });

  }
 async openMonthFilter() {
    const alert = await this.alertController.create({
      cssClass: 'change-design-alert',
      header: 'Select Month',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: '3 Months',
          value: 3,
          checked: true
        },
        {
          name: 'radio1',
          type: 'radio',
          label: '6 Months',
          value: 6,
        },
        {
          name: 'radio2',
          type: 'radio',
          label: '1 Year',
          value: 12
        },
        {
          name: 'radio1',
          type: 'radio',
          label: '2 Year',
          value: 24,
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'All Data',
          value: 0
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data) => {
            this.month = data;
            this.pgload()
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
}
