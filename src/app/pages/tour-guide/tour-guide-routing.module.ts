import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SliderComponent } from './slider/slider.component';

import { TourGuidePage } from './tour-guide.page';

const routes: Routes = [
  {
    path: ':id',
    component: TourGuidePage
  },
  {
    path: 'slider/:id',
    component: SliderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TourGuidePageRoutingModule { }
