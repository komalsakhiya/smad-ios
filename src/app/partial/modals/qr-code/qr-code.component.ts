import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {

  @Input() qrData: string;
  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
