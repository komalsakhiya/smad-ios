import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PTimer } from './PTimer';
import { Router } from '@angular/router';
import { GetDataService } from '../../../service/get-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EventService } from '../../../service/event.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss'],
})
export class AdDetailsComponent implements OnInit {
  dialCode: any = '91';
  addetails;
  private timeInSeconds: number;
  public timer: PTimer;
  inp;
  inp1;
  out;
  smuserid;
  pointsearned;
  title;
  subtitle;
  timerrun;
  testRadioOpen;
  testRadioResult;
  videoFileSafe;
  mobileno;
  premium;
  smtoken;
  lat;
  lang;
  alertMessage;
  ttl;
  msg;
  mapurl;
  mapurlSafe;
  lnk: string;
  stoptime = 0;
  myInputs: any;
  coinArr = [];
  constructor(
    private dom: DomSanitizer,
    private DataService: GetDataService,
    private router: Router,
    private photoViewer: PhotoViewer,
    private callNumber: CallNumber,
    public alertController: AlertController,
    public events: EventService,
    private platform: Platform
  ) {
    this.mobileno = localStorage.getItem('mobileno');
    this.smtoken = localStorage.getItem('smtoken');
    this.smuserid = localStorage.getItem('smuserid');
    this.addetails = history.state.addetails;
    if (this.addetails.points > '0') {
      const point = Number(this.addetails.points);
      for (let i = 0; i < point; i++) {
        this.coinArr.push('assets/images/coin.png')
      }
    }
    this.timerrun = history.state.timerrun;
    this.initTimer();
    this.timerrun = 0;
    this.videoFileSafe = this.dom.bypassSecurityTrustResourceUrl(this.addetails.videoFile);
    // tslint:disable-next-line: max-line-length
    this.mapurl = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyD9Yln70_6N16CRLRsbTIi_xhParnLQCo4&q=' + this.addetails.lat + ',' + this.addetails.lang;
    this.mapurlSafe = this.dom.bypassSecurityTrustResourceUrl(this.mapurl);
  }
  initTimer() {
    if (!this.timeInSeconds && this.addetails) { this.timeInSeconds = this.addetails.timeSeconds; }

    this.timer = {
      time: this.timeInSeconds,
      runTimer: false,
      hasStarted: false,
      hasFinished: false,
      timeRemaining: this.timeInSeconds
    } as PTimer;
    this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
    this.startTimer();
  }
  getSecondsAsDigitalClock(inputSeconds: number) {
    if (inputSeconds) {
      const secnum = parseInt(inputSeconds.toString(), 10); // don't forget the second param
      const seconds = secnum;
      let secondsString = '';
      secondsString = seconds.toString();
      return secondsString;
    }
  }
  startTimer() {
    this.timer.hasStarted = true;
    this.timer.runTimer = true;
    this.timerTick();
  }
  timerTick() {
    setTimeout(() => {

      if (!this.timer.runTimer) { return; }
      this.timer.timeRemaining--;
      this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.timeRemaining);
      if (this.timer.timeRemaining > 0 && this.stoptime === 0) {
        this.timerTick();
      } else {
        this.timer.hasFinished = true;

        if (this.addetails.points > 0 && this.stoptime === 0) {
          this.pointsearned = this.addetails.points;
          this.addetails.points = 0;
          this.inp = {
            reqid: 40975006,
            adsId: this.addetails.adsId,
            description: 'CM Points earned for Reading Ad',
            mobileno: this.mobileno,
            smtoken: this.smtoken
          };
          this.httpserv();
        }
      }
    }, 1000);
  }
  fullimage(item) {
    this.photoViewer.show(item, '', { share: false });
  }
  public openWithCordovaBrowser() {
    this.lnk = this.addetails.website;
    this.openbrowser(this.lnk);
  }
  pauseTimer() {
    this.timer.runTimer = false;
  }
  async call() {
    this.pauseTimer();
    if (this.addetails.advMobile1 == "" && this.addetails.advMobile2 == "") {
      this.testRadioOpen = false;
      this.testRadioResult = this.addetails.advMobile;
      // call
      this.callNumber.callNumber(this.testRadioResult, false)
        .then(() => console.log('Launched dialer!', this.testRadioResult))
        .catch(() => console.log('Error launching dialer', this.testRadioResult));
    } else {
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
            handler: data => {
              this.testRadioOpen = false;
              this.testRadioResult = data;
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
  navigatetoenqpage(): void {
    this.router.navigate(['home/enquiry'], { state: { bookingId: this.addetails.bookingId, businessId: 2 } });
  }
  favchange(newfav) {
    this.inp1 = {
      reqid: 40975007,
      adsId: this.addetails.bookingId,
      smuserid: this.smuserid,
      fav_sts: newfav,
      businessId: 2
    };
    this.httpserv1(newfav);
  }
  async httpserv() {
    
    this.DataService.getDetails(this.inp)
      .subscribe(data => {
        this.out = data;
        if (this.out.Success === '1') {
          const data1 = {
            adsId: this.addetails.adsId
          };
          this.events.publish('pointevent', { frm: 'mp', data1 });
          this.title = this.out.title;
          this.subtitle = this.out.message;
        } else {
          if (this.out.Failure === '2') {
            this.title = 'Failure';
            this.subtitle = 'You have already earned SMAD Cash on this Advertisement.';
          } else {
            this.title = 'Failure';
            this.subtitle = 'Technical error.';
          }
        }


        this.presentAlert(this.title, this.subtitle);
      }, error => {
        alert('http err');
      });

  }
  async httpserv1(newfav) {
    this.DataService.getDetails(this.inp1)
      .subscribe(res => {
        this.addetails.fav_sts = newfav;
        const data1 = {
          adsId: this.addetails.adsId,
          fav_sts: this.addetails.fav_sts
        };
        this.events.publish('favevent', { frm: 'mp', data1 });
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
  async openbrowser(lnk) {
    await Browser.open({ url: lnk });
  }
  backpress() {
    this.stoptime = 1;
  }

  openMap(lat, lng, name?) {
    const destination = lat + ',' + lng;
    if (this.platform.is('ios')) {
      window.open('maps://?q=' + destination, '_system');
    } else {
      window.open('https://maps.google.com/?q=' + destination, '_system');
    }
  }

  ngOnInit() {
    this.myInputs = this.createInputs();
  }

  createInputs() {
    const theNewInputs = [];
    const myArray = [];
    myArray.push(this.addetails.advMobile, this.addetails.advMobile1);
    if (this.addetails.advMobile2 !== '') {
      myArray.push(this.addetails.advMobile2);
    }
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

  shareOnWhatsapp() {
    window.open('https://wa.me/' + this.addetails.advMobile2 + '/', '_blank');
  }

}
