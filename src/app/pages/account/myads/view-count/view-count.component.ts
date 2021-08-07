import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-count',
  templateUrl: './view-count.component.html',
  styleUrls: ['./view-count.component.scss'],
})
export class ViewCountComponent implements OnInit {
  viewData: any = [

  ];
  constructor(
    private modalCtrl: ModalController
  ) {
    this.viewData = history.state.viewData;
  }

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
