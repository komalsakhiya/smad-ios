import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AuthService } from '../../../service/auth.service';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
const { Device, Geolocation } = Plugins;
declare var SMSReceive: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('ngOtpInput', { static: false }) ngOtpInputRef: any;
  loginForm: FormGroup;
  auth: any;
  mobile: any = null;
  isRequestToOtp = false;
  verificationID: any;
  inp: any;
  enteredOTP: any;
  latitude: any;
  longitude: any;
  mobileno: any;
  out: any;
  fbregid: any;

  otpAlert;
  constructor(
    private firebaseAuthentication: FirebaseAuthentication,
    private authService: AuthService,
    public router: Router,
    private ngZone: NgZone,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.intiateForm();
    this.getLocation();
    if (localStorage.getItem('mobileno')) {
      this.router.navigate(['/home']);
    }
  }

  intiateForm() {
    this.loginForm = new FormGroup({
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      // refmobile: new FormControl('', [
      //   Validators.pattern('^[0-9]{10}$')
      // ])
    });
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  /**
   * Login
   */
  login(data) {
    const controls = this.loginForm.controls;
    // check form
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const mob = '+' + '91' + data.value.mobile;

    this.firebaseAuthentication.onAuthStateChanged().subscribe(
      (user) => {
        if (user) {
          console.log('user is: ', user);
          // this.presentVerifiedAlert();
          this.firebaseAuthentication.signOut();
          this.Service1(this.loginForm.value);
          this.isRequestToOtp = false;
          localStorage.setItem('mobileno', user.phoneNumber.slice(3));
        }
      },
      (err) => {
        console.log('error in this.auth', err);
        localStorage.removeItem('mobileno');
      }
    );

    this.isRequestToOtp = true;
    this.firebaseAuthentication
      .verifyPhoneNumber(mob, 3000)
      .then((verificationID) => {
        console.log('vID: ' + verificationID);
        this.verificationID = verificationID;
      })
      .catch((error) => {
        console.log('verifyPhone error ' + error);
        alert('verifyPhone error ' + error);
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
      () => {
        console.log('watch start failed');
      }
    );
  }

  stop() {
    SMSReceive.stopWatch(
      () => {
        console.log('watch stopped');
      },
      () => {
        console.log('watch stop failed');
      }
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
    this.firebaseAuthentication
      .signInWithVerificationId(this.verificationID, this.enteredOTP)
      .then((user) => {
        console.log('USER===========', user);
      })
      .catch((error) => {
        alert('verification failed');
        this.isRequestToOtp = false;
        this.cdr.detectChanges();
        localStorage.removeItem('mobileno');
      });
  }

  onOtpChange(e) {
    console.log(e);
    this.enteredOTP = e;
  }
  async presentVerifiedAlert() {
    const alert = await this.alertController.create({
      header: 'OTP Verified',
      message: 'Phone no. verified successfully',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async Service1(data) {
    const info = await Device.getInfo();
    localStorage.setItem('mobileno', data.mobile);
    localStorage.setItem('deviceid', info.uuid);
    this.mobileno = localStorage.getItem('mobileno');
    this.fbregid = localStorage.getItem('fbregid');
    this.inp = {
      reqid: 4097501,
      deviceid: info.uuid,
      mobileno: this.mobileno,
      model: info.model,
      devicename: info.model,
      operatingSystem: info.operatingSystem,
      platform: info.platform,
      manufacturer: info.manufacturer,
      osVersion: info.osVersion,
      isVirtual: 'false',
      regid: this.fbregid,
      regtype: 'FCM',
      referalmobile: '',
      lat: this.latitude,
      lang: this.longitude,
      fname: '',
    };
    this.httpservs();
  }
  async httpservs() {
    console.log('INP', this.inp);

    this.authService.register(this.inp)
      .subscribe(res => {
        this.out = res;
        console.log('this.out', this.out);
        localStorage.setItem('smuserid', this.out.smuserid);
        localStorage.setItem('smtoken', this.out.smtoken);
        this.router.navigateByUrl('/home');
        this.ngZone.run(() => {
          this.router.navigateByUrl('/home');
        });
        this.loginForm.reset();
        this.isRequestToOtp = false;
      }, error => {
        alert('http err');
        localStorage.removeItem('mobileno');
      });
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
  }
}
