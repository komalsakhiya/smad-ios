import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmadVoucherComponent } from './smad-voucher.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SmadVoucherComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: SmadVoucherComponent
      }
    ])
  ]
})
export class SmadVoucherModule { }
