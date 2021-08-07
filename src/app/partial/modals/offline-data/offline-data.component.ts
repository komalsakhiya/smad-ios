import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-offline-data',
  templateUrl: './offline-data.component.html',
  styleUrls: ['./offline-data.component.scss'],
})
export class OfflineDataComponent implements OnInit {
  offlineData: any;
  testRadioOpen;
  testRadioResult;
  myInputs: any;
  constructor(
    private modalCtrl: ModalController,
    private callNumber: CallNumber,
    private alertController: AlertController

  ) {
    this.offlineData = history.state.offlineData;
  }

  ngOnInit() {
    this.myInputs = this.createInputs();
  }


  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  createInputs() {
    const theNewInputs = [];
    const myArray = [];
    myArray.push(this.offlineData.franchisee_mob, this.offlineData.franchisee_mob1);
    if (this.offlineData.franchisee_mob2 !== '') {
      myArray.push(this.offlineData.franchisee_mob2);
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

  async call() {
    if (!this.offlineData.franchisee_mob1 && this.offlineData.franchisee_mob1 === '' && this.offlineData.franchisee_mob2 === '') {
      this.testRadioOpen = false;
      this.testRadioResult = this.offlineData.franchisee_mob;
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
            handler: result => {
              this.testRadioOpen = false;
              this.testRadioResult = result;
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

  whtasppRedirect() {
    window.open('https://wa.me/+91' + this.offlineData.franchisee_wa + '/', '_blank');

  }

}
