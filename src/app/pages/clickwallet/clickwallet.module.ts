import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClickwalletPageRoutingModule } from './clickwallet-routing.module';

import { ClickwalletPage } from './clickwallet.page';
import { PartialModule } from 'src/app/partial/partial.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClickwalletPageRoutingModule,
    PartialModule
  ],
  declarations: [ClickwalletPage]
})
export class ClickwalletPageModule {}
