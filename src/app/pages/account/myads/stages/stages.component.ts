import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss'],
})
export class StagesComponent implements OnInit {
  stages: any;
  id: any;
  stageId: number;
  constructor(
    private modalCtrl: ModalController

  ) {
    this.stages = history.state.stages;
    this.stageId = history.state.stageId;
  }

  ngOnInit() {
    this.stageId = Number(this.stageId);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
