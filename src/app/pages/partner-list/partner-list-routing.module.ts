import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartnerListPage } from './partner-list.page';
import { PayCmCoinComponent } from './pay-cm-coin/pay-cm-coin.component';

const routes: Routes = [
  {
    path: '',
    component: PartnerListPage
  },
  {
    path: 'paycmcoin',
    component: PayCmCoinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartnerListPageRoutingModule {}
