import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmtransactionsPage } from './cmtransactions.page';

const routes: Routes = [
  {
    path: '',
    component: CmtransactionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmtransactionsPageRoutingModule {}
