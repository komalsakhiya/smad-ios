import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GetDataService } from 'src/app/service/get-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pay-cm-coin',
  templateUrl: './pay-cm-coin.component.html',
  styleUrls: ['./pay-cm-coin.component.scss'],
})
export class PayCmCoinComponent implements OnInit {


  payCMForm: FormGroup;
  inp;
  inp1;
  datain;
  constructor(
    private location: Location,
    public alertController: AlertController,
    private DataService: GetDataService,
  ) {
   
  }

  ngOnInit() {
    this.intiateForm();
  }

  intiateForm() {
    this.payCMForm = new FormGroup({
      tomobileno: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      cmpoints: new FormControl('', [Validators.required]),
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.payCMForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  sendCMCoin(data) {
    const controls = this.
      payCMForm.controls;
    // check form
    if (this.payCMForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.inp1 = {
      reqid: 40975033,
      mobileno: localStorage.getItem('mobileno'),
      cmpoints: this.payCMForm.value.cmpoints,
      tomobileno: this.payCMForm.value.tomobileno,
      smtoken: localStorage.getItem('smtoken')
    };
    this.httpserv1();
  }

  async httpserv1() {
    this.DataService.getDetails(this.inp1)
      .subscribe(data => {
        this.datain = data;
        this.presentAlert('Success', this.datain.message);
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
