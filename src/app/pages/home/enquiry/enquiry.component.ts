import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { GetDataService } from '../../../service/get-data.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss'],
})
export class EnquiryComponent implements OnInit {
  enquiryForm: FormGroup;
  items = [
    {
      optionName: 'Advertisement'
    },
    {
      optionName: 'Voucher Partner'
    },
    {
      optionName: 'Cashback Partner'
    },
    {
      optionName: 'Franchisee'
    },
    {
      optionName: 'Other'
    }
  ];
  bookingId;
  msg: string;
  ttl: string;
  smuserid;
  businessId;
  inp;
  inp1;
  mobileno;
  smtoken;
  constructor(
    private location: Location,
    public alertController: AlertController,
    private DataService: GetDataService,
  ) {
    this.enquiryForm = new FormGroup({
      enqtext: new FormControl('', [Validators.required]),
      enqtext1: new FormControl('')
    });
  }

  ngOnInit() {
    this.bookingId = history.state.bookingId;
    this.businessId = history.state.businessId;
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.enquiryForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  sendEnquiry(data) {
    const controls = this.enquiryForm.controls;
    // check form
    if (this.enquiryForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.smuserid = localStorage.getItem('smuserid');
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.inp1 = {
      reqid: 40975008,
      bookingId: this.bookingId ? this.bookingId : '0',
      mobileno: this.mobileno,
      smtoken: this.smtoken,
      // smuserid: this.smuserid,
      enqText: '--' + this.enquiryForm.value.enqtext + '--' + this.enquiryForm.value.enqtext1,
      businessId: this.businessId
    };
    this.httpserv1();
  }

  async httpserv1() {
    this.DataService.getDetails(this.inp1)
      .subscribe((data: any) => {
        if (data.Success == 1) {
          this.presentAlert(data.title, data.message);
        }
        this.location.back();
      }, error => {
        alert('http err');
      });

  }
  async presentAlert(hdr, subhdr) {
    const alert = await this.alertController.create({
      header: hdr,
      subHeader: subhdr,
      buttons: ['OK']
    });
    await alert.present();
  }
}
