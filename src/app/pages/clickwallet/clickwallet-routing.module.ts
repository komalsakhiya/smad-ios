import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClickwalletPage } from './clickwallet.page';

const routes: Routes = [
  {
    path: '',
    component: ClickwalletPage,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClickwalletPageRoutingModule {}
