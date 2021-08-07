import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from './service/loader.service';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor,
  StatusBarStyle
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from './service/toast.service';
import { EventService } from './service/event.service';
import { GetDataService } from './service/get-data.service';
const { PushNotifications, LocalNotifications, StatusBar } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  loading = false;
  isAppOpenFirstTime;
  public backButtonPressedTimer: any;
  public backButtonPressed = false;
  openingData: any;
  mobileno: any;
  smtoken: any;
  inp: any;
  constructor(
    private loaderService: LoaderService,
    private platform: Platform,
    private router: Router,
    private toastService: ToastService,
    private DataService: GetDataService,
    private events: EventService
  ) {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/home' || this.router.url === '/auth/login') {
        // navigator['app'].exitApp();
        if (this.backButtonPressed) {
          // tslint:disable-next-line: no-string-literal
          navigator['app'].exitApp();
        } else {
          this.toastService.presentToast('Press again to exit App');
          this.backButtonPressed = true;
          if (this.backButtonPressedTimer) {
            clearTimeout(this.backButtonPressedTimer);
          }
          this.backButtonPressedTimer = setTimeout(() => {
            this.backButtonPressed = false;
          }, 2000);
        }
      }
    });
    this.initializeApp();
    // this.showUserGuide();
  }

  ngAfterViewInit() {
    // localStorage.setItem('mobileno', '9874563211');
    // localStorage.setItem('deviceid', '9d6add0a7bd8925c');
    // localStorage.setItem('smuserid', '4');
    // localStorage.setItem('smtoken', 'JQy2Iql8Fneypb3jQy0ReuHCDZi3wVelupHPoDnR5BBTaCwfy73a');
    // localStorage.setItem('custid', '2');
    this.loaderService.loading.subscribe((res: boolean) => {
      this.loading = res;
    });
    PushNotifications.removeAllDeliveredNotifications();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({
        style: StatusBarStyle.Dark,
      });

      StatusBar.setBackgroundColor({
        color: '#007d36'
      });
    });
  }

  private registerPush() {
    PushNotifications.requestPermission().then((permission) => {
      if (permission.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });

    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        localStorage.setItem('fbregid', token.value);
        console.log('My token: ' + JSON.stringify(token));
      }
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('Error: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotification) => {
        console.log('Push received: ' + JSON.stringify(notification), notification);
        this.getNotificationCount();
        const notifs = await LocalNotifications.schedule({
          notifications: [
            {
              title: notification.title,
              body: notification.body,
              id: 1,
              schedule: { at: new Date(Date.now() + 1000 * 5) },
              sound: null,
              attachments: null,
              actionTypeId: '',
              extra: null
            }
          ]
        });
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification: PushNotificationActionPerformed) => {
        const data = notification.notification.data;
        console.log('Action performed: ' + JSON.stringify(notification.notification));
        if (data.detailsId) {
          // this.router.navigateByUrl(`/home/${data.detailsId}`);
        }
      }
    );
  }
  showUserGuide() {
    const mobile = localStorage.getItem('mobileno');
    this.isAppOpenFirstTime = localStorage.getItem('isAppOpenFirstTime');
    if (!this.isAppOpenFirstTime) {
      localStorage.setItem('isAppOpenFirstTime', 'true');
      this.router.navigate(['/tour-guide']);
    }
  }
  getNotificationCount() {
    this.mobileno = localStorage.getItem('mobileno');
    this.loading = false;
    if (this.mobileno) {
      this.smtoken = localStorage.getItem('smtoken');
      this.inp = {
        reqid: 40975003,
        smtoken: this.smtoken,
        appversion: '1.0.0'
      };
      this.DataService.getDetails(this.inp)
        .subscribe((res: any) => {
          if (res && res.newsmtoken) {
            this.openingData = res;
            localStorage.setItem('userdetails', JSON.stringify(res));
            localStorage.setItem('smtoken', res.newsmtoken);
            localStorage.setItem('block', res.block);
            localStorage.setItem('custid', res.custid);
            localStorage.setItem('cmpartner_id', res.cmpartner_id);
            localStorage.setItem('email', res.email);
            localStorage.setItem('guide', res.guide);
            localStorage.setItem('marketerid', res.marketerid);
            localStorage.setItem('showImage', res.showImage);
            localStorage.setItem('updatetype', res.updatetype);
            this.events.publish('notiCountEvent', { count: res.noti });
          }
        });
    }
  }
}
