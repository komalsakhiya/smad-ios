import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'details',
    component: AdDetailsComponent
  },
  {
    path: 'enquiry',
    component: EnquiryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
