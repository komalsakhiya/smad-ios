import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetDataService } from '../../service/get-data.service';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { Plugins, } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { SideBarPage } from '../side-bar/side-bar.page';
import { ToastService } from 'src/app/service/toast.service';
declare var SMSReceive: any;
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  editForm: FormGroup;
  inp;
  mobileno: any = localStorage.getItem('mobileno');
  smtoken: any;
  out: any;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
  auth: any;
  mobile: any = null;
  isRequestToOtp = false;
  verificationID: any;
  enteredOTP: any;
  isEmailOtp = false;
  mailOtp: any;
  otpLength = 6;
  recaptchaVerifier: any;

  constructor(
    private DataService: GetDataService,
    private firebaseAuthentication: FirebaseAuthentication,
    private alertController: AlertController,
    private sideBar: SideBarPage,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef

  ) {
  }


  initEditForm() {
    this.editForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('', [Validators.email]),
      mobile: new FormControl('', [Validators.pattern('^[0-9]{10}$'), Validators.required]),
    });
  }

  ngOnInit() {
    this.initEditForm();
    this.getUserDetails();
  }


  ionViewDidEnter() {
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('reacaptcha-container-login', { size: 'invisible' });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.editForm.controls[controlName];
    if (!control) {
      return false;
    }
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  getUserDetails() {
    this.mobileno = localStorage.getItem('mobileno');
    if (this.mobileno) {
      this.smtoken = localStorage.getItem('smtoken');
      this.inp = {
        reqid: 40975003,
        smtoken: this.smtoken,
        appversion: '1.0.0'
      };
      // 
      this.httpservs2(this.inp);
    }
  }

  httpservs2(payload) {
    this.DataService.getDetails(payload)
      .subscribe(res => {
        this.out = res;
        localStorage.setItem('smtoken', this.out.newsmtoken);
        localStorage.setItem('block', this.out.block);
        localStorage.setItem('custid', this.out.custid);
        localStorage.setItem('cmpartner_id', this.out.cmpartner_id);
        // localStorage.setItem('cname', this.out.cname);
        localStorage.setItem('email', this.out.email);
        localStorage.setItem('guide', this.out.guide);
        localStorage.setItem('marketerid', this.out.marketerid);
        localStorage.setItem('showImage', this.out.showImage);
        localStorage.setItem('updatetype', this.out.updatetype);
        // localStorage.setItem('userdetails', JSON.stringify(this.out));
        // this.editForm.patchValue(this.out);
        this.editForm.controls.mobile.setValue(this.mobileno);
        if (this.out.email && this.out.email === '-') {
          this.out.email = null;
        }
        if (this.out.cname && this.out.cname === '-') {
          this.out.cname = null;
        }
        this.editForm.controls.email.setValue(this.out.email);
        this.editForm.controls.name.setValue(this.out.cname);
        this.sideBar.getUserDetails();
      }, error => {
        alert('http err');
      });
  }

  httpservs(payload) {
    this.DataService.getDetails(payload)
      .subscribe(res => {
        this.out = res;
        if (this.out.Success === 1) {
          this.toastService.presentToast(this.out.message);
          if (payload.type === 1) {
            localStorage.setItem('mobileno', payload.newmobileno);
          }
        }
        this.sideBar.getUserDetails();
      }, error => {
        alert('http err');
      });
  }

  /** Edit user */
  edit(data) {
    const controls = this.editForm.controls;
    // check form
    if (this.editForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.inp = {
      reqid: 4097501,
      mobileno: data.value.mobileno,
      name: data.value.name,
    };
    if (this.mobileno !== data.value.mobile) {
      this.sendOtpProcess(data);
      this.otpLength = 6;
      this.cdr.detectChanges();
    }
  }

  sendOtpProcess(data) {
    const mob = '+' + '91' + data.value.mobile;
    this.isEmailOtp = false;
    this.otpLength = 6;
    this.cdr.detectChanges();
    console.log('number', mob);

    this.firebaseAuthentication.onAuthStateChanged().subscribe((user) => {
      if (user) {
        console.log('user is: ', user);
        // this.presentVerifiedAlert();
        this.firebaseAuthentication.signOut();
        this.Service1();
        this.isRequestToOtp = false;
        localStorage.setItem('mobileno', user.phoneNumber.slice(3));
      }
    }, (err) => {
      console.log('error in this.auth', err);
      localStorage.removeItem('mobileno');
    });

    this.isRequestToOtp = true;
    this.firebaseAuthentication.verifyPhoneNumber(mob, 3000).then((verificationID) => {
      console.log('vID: ' + verificationID);
      this.verificationID = verificationID;
    }).catch((error) => {
      console.log('verifyPhone error ' + error);
      localStorage.removeItem('mobileno');
    });

    SMSReceive.startWatch(
      () => {
        document.addEventListener('onSMSArrive', (e: any) => {
          const IncomingSMS = e.data;
          console.log('e', e);
          this.processSMS(IncomingSMS);
        });
      },
      () => { console.log('watch start failed'); }
    );
  }

  stop() {
    SMSReceive.stopWatch(
      () => { console.log('watch stopped'); },
      () => { console.log('watch stop failed'); }
    );
  }

  processSMS(data) {
    // Check SMS for a specific string sequence to identify it is you SMS
    // Design your SMS in a way so you can identify the OTP quickly i.e. first 6 letters
    // In this case, I am keeping the first 6 letters as OTP
    const message = data.body;
    console.log('SMS RECEIVED', message);
    if (message) {
      this.ngOtpInputRef.setValue(data.body.slice(0, 6));
      this.stop();
      this.enteredOTP = data.body.slice(0, 6);
      this.verifyOTP();
    }
  }

  verifyOTP() {
    console.log('ENTERED OTP', this.enteredOTP);
    this.firebaseAuthentication.signInWithVerificationId(this.verificationID, this.enteredOTP).then((user) => {
      console.log('USER===========', user);
    }).catch((error) => {
      alert('verification failed');
      this.isRequestToOtp = false;
    });
  }

  onOtpChange(e) {
    this.enteredOTP = e;
  }
  async presentVerifiedAlert() {
    const alert = await this.alertController.create({
      header: 'OTP Verified',
      message: 'Phone no. verified successfully',
      buttons: ['OK']
    });

    await alert.present();
  }

  editName(typeData) {
    const obj = {
      reqid: 40975024,
      mobileno: this.mobileno,
      smtoken: localStorage.getItem('smtoken'),
      type: typeData,
      newmobileno: 0,
      emailid: 0,
      frstverification: 0,
      fname: this.editForm.value.name
    };
    this.httpservs(obj);
  }

  editMobileno(typeData) {
    const controls = this.editForm.controls;
    // check form
    if (controls.mobile.invalid) {
      controls.mobile.markAsTouched();
      return;
    }
    if (this.mobileno !== this.editForm.value.mobile) {
      this.sendOtpProcess(this.editForm);
    }
  }

  editEmail(typeData) {
    this.isRequestToOtp = false;
    const controls = this.editForm.controls;
    // check form
    if (controls.email.invalid) {
      controls.email.markAsTouched();
      return;
    }
    if (this.editForm.value.email) {
      const obj = {
        reqid: 40975024,
        mobileno: this.mobileno,
        smtoken: localStorage.getItem('smtoken'),
        type: typeData,
        newmobileno: 0,
        emailid: this.editForm.value.email,
        frstverification: 0,
        fname: 0
      };
      this.httpservs1(obj);
    }
  }

  async Service1() {
    const obj = {
      reqid: 40975024,
      mobileno: this.mobileno,
      smtoken: localStorage.getItem('smtoken'),
      type: 1,
      newmobileno: this.editForm.value.mobile,
      emailid: 0,
      frstverification: 0,
      fname: 0
    };
    this.httpservs(obj);
  }

  httpservs1(payload) {
    this.DataService.getDetails(payload)
      .subscribe((res: any) => {
        if (res.Success === 1) {
          this.isEmailOtp = true;
          this.toastService.presentToast(res.message);
          if (payload.type === 2) {
            this.mailOtp = res.changeemailotp;
            this.otpLength = res.changeemailotp.length;
            this.cdr.detectChanges();
          }
        }
      }, error => {
        alert('http err');
      });
  }

  verifyOTPOfEmail() {
    const obj = {
      reqid: 40975024,
      mobileno: this.mobileno,
      smtoken: localStorage.getItem('smtoken'),
      type: 3,
      newmobileno: 0,
      emailid: this.editForm.value.email,
      frstverification: this.out.email ? 1 : 0,
      fname: 0
    };
    // tslint:disable-next-line: triple-equals
    if (this.mailOtp == this.enteredOTP) {
      this.httpservs(obj);
    } else {
      this.toastService.presentToast('Otp is not Verified');
    }
  }
}
