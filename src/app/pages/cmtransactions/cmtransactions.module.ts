import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmtransactionsPageRoutingModule } from './cmtransactions-routing.module';

import { CmtransactionsPage } from './cmtransactions.page';
import { PartialModule } from 'src/app/partial/partial.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmtransactionsPageRoutingModule,
    PartialModule
  ],
  declarations: [CmtransactionsPage]
})
export class CmtransactionsPageModule {}
