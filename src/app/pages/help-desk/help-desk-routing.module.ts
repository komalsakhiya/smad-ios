import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { HelpDeskDetailComponent } from './help-desk-detail/help-desk-detail.component';

import { HelpDeskPage } from './help-desk.page';

const routes: Routes = [
  {
    path: '',
    component: HelpDeskPage
  },
  {
    path: 'details/:id',
    component: HelpDeskDetailComponent
  },
  {
    path: 'add-ticket',
    component: AddTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpDeskPageRoutingModule { }
