import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { EncashVoucherComponent } from './encash-voucher.component';



@NgModule({
  declarations: [EncashVoucherComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: EncashVoucherComponent
      }
    ])
  ]
})
export class EncashVoucherModule { }
