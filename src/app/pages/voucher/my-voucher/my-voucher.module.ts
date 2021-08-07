import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyVoucherComponent } from './my-voucher.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MyVoucherComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyVoucherComponent
      }
    ])
  ]
})
export class MyVoucherModule { }
