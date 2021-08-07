import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {
  mobileno = localStorage.getItem('mobileno');
  slideOpts = {
    initialSlide: 0,
    speed: 300,
    autoplay: true
  };
  imgArr = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLecBCpMMLXmjlAvzkB6RFl5LNF6mN4kHoA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwr8P9YUsPoLJl8GwD6zRiPm9zu9BzHNpNuQ&usqp=CAU'
  ];
  msg = 'Hi, Use your mobile number to signup and use my number ' + this.mobileno + ' in referral to get 100 Free CashMash points. Click https://play.google.com/store/apps/details?id=in.skillbiz.cashmash to download the CashMash app for Android or https://itunes.apple.com/in/app/cashmash/id1300776393 for Apple ios.';

  constructor(
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
  }

  shareApp() {
    this.socialSharing.share(this.msg)
      .then(() => {
        // alert("Success");
      },
        () => {
          alert('failed');
        });
  }

}
