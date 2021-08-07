import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-encash-voucher',
  templateUrl: './encash-voucher.component.html',
  styleUrls: ['./encash-voucher.component.scss'],
})
export class EncashVoucherComponent implements OnInit {
  vouchers: any = [
    {
      image: 'https://bd.gaadicdn.com/processedimages/honda/shine-bs6/source/shine-bs65e53b6ef4306f.jpg?tr=h-48',
      price: 200,
      code: 'ABCYTRKU',
      date: new Date(),
      status: 2,
      mobileno: 9874563214,
      lat: 22.3039,
      lng: 70.8022,
      address: 'Postmaster, Rajkot City S.O, Rajkot, Gujarat, India (IN), Pin Code:-360001'
    },
    {
      image: 'https://www.lovesove.com/wp-content/uploads/2017/01/sad-girl-image-sun-sea-lovesove.jpg',
      price: 200,
      code: 'ABCYTRKU',
      date: new Date(),
      status: 0,
      mobileno: 9874563214,
      lat: 22.3039,
      lng: 70.8022,
      address: 'Postmaster, Rajkot City S.O, Rajkot, Gujarat, India (IN), Pin Code:-360001'
    },
    {
      image: 'https://www.hindisoch.com/wp-content/uploads/2019/07/Good-Morning-Sun-Rays-Image-Photo.jpg',
      price: 200,
      code: 'ABCYTRKU',
      date: new Date(),
      status: 1,
      mobileno: 9874563214,
      lat: 22.3039,
      lng: 70.8022,
      address: 'Postmaster, Rajkot City S.O, Rajkot, Gujarat, India (IN), Pin Code:-360001'
    },
  ];
  constructor(
    private alertController: AlertController,
  ) { }

  ngOnInit() { }

  async designChange(ev: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Encash Voucher',
      inputs: [
        {
          name: 'Encash',
          type: 'radio',
          label: 'Encash-Against',
          value: 'value1',
          checked: true
        },
        {
          name: 'Encash-Get-Click',
          type: 'radio',
          label: 'Encash-Get',
          value: 'value2'
        },
      ],
      buttons: [
        {
          text: 'Ok',
          handler: () => {
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
