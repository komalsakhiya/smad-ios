import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss'],
})
export class EnquiryComponent implements OnInit {
  enquiryData: any;
  constructor(
    private modalCtrl: ModalController
  ) {
    this.enquiryData = history.state.enquiryData;
  }

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
