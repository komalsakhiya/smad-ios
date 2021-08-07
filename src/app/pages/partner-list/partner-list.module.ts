import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartnerListPageRoutingModule } from './partner-list-routing.module';

import { PartnerListPage } from './partner-list.page';
import { PartialModule } from 'src/app/partial/partial.module';
import { PayCmCoinComponent } from './pay-cm-coin/pay-cm-coin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartnerListPageRoutingModule,
    PartialModule,
    ReactiveFormsModule
  ],
  declarations: [
    PartnerListPage,
    PayCmCoinComponent
  ]
})
export class PartnerListPageModule {}
