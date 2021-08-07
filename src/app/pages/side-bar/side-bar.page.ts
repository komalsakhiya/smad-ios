import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EventService } from '../../service/event.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.page.html',
  styleUrls: ['./side-bar.page.scss'],
})
export class SideBarPage implements OnInit {
  mobileno = localStorage.getItem('mobileno');
  inp;
  smtoken;
  out = '';
  custid = localStorage.getItem('custid');
  cmPartnerId = localStorage.getItem('cmPartnerId');
  marketerId = localStorage.getItem('marketerid');
  // out = JSON.parse(localStorage.getItem('userdetails'));
  public appPages = [
    // { title: 'Home', url: '/home', icon: 'home' },
    { title: 'My Ads', url: '/myads', icon: 'list' },
    // { title: 'Favourite Ads', url: '/account/favouriteads', icon: 'heart' },
    { title: 'Click Wallet', url: '/clickwallet', src: '../../../assets/images/logo.png' },
    { logo: '../../../assets/images/text-logo.png', title: 'Wallet', url: '/cmtransactions', src: '../../../assets/images/coin.png' },
    // { title: 'Redeem Coin', url: '/smad-voucher', icon: 'ticket' },
    { title: 'My Vouchers', url: '/my-voucher', icon: 'ticket' },
    // { title: 'Encash Voucher', url: '/encash-voucher', icon: 'ticket' },
    { title: 'Shop & Earn', url: '/partner-list', icon: 'people' },
    { title: 'Notification', url: '/notification', icon: 'notifications' },
    { title: 'Support', url: '/help-desk', icon: 'help-circle' },
    { title: 'Partner Area', url: '/scanner', icon: 'scan' },
    { title: 'Pay CM Coin', url: '/partner-list/paycmcoin', icon: 'help-circle' },
    // { title: 'Advertise/Partner with Us', url: '/home/enquiry', icon: 'people' },
    { title: 'CashMash Guide', url: '/tour-guide/1', icon: 'golf' },
    { title: 'Share', url: '/share', icon: 'share-social' },
  ];
  email: any;
  notificationCount: any = 0;
  constructor(
    private authService: AuthService,
    private menu: MenuController,
    private router: Router,
    public events: EventService,
  ) {
  }

  ngOnInit() {
    this.getUserDetails();
  }
  ionViewDidEnter() {
    this.events.subscribe('notiCountEvent', (data) => {
      console.log('data in sidebar', data);
      this.notificationCount = data.count;
    });
    this.events.subscribe('sidebar', () => {
      this.custid = localStorage.getItem('custid');
      this.cmPartnerId = localStorage.getItem('cmPartnerId');
      this.marketerId = localStorage.getItem('marketerid');
    });
  }

  logOut() {
    this.authService.logOut();
    this.menu.close();
  }

  cloaseMenu() {
    this.menu.close();
  }

  getUserDetails() {
    this.mobileno = localStorage.getItem('mobileno');
    this.email = localStorage.getItem('email');
    // this.out = JSON.parse(localStorage.getItem('userdetails'));
  }

  addEnquiry() {
    this.router.navigate(['home/enquiry'], { state: { businessId: '0' } });
  }

  clientArea() {
    window.open('https://www.google.com/', '_blank');
  }

  franchieseArea() {
    window.open('https://www.google.com/', '_blank');
  }
}
