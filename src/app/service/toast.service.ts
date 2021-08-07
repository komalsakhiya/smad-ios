import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  constructor(public toastController: ToastController) { }

  async presentToast(messageTxt) {
    const toast = await this.toastController.create({
      message: messageTxt,
      duration: 2000,
      cssClass: 'toast-color'
    });
    toast.present();
  }
}
