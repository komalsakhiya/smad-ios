import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TourGuidePageRoutingModule } from './tour-guide-routing.module';

import { TourGuidePage } from './tour-guide.page';
import { SliderComponent } from './slider/slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TourGuidePageRoutingModule
  ],
  declarations: [TourGuidePage, SliderComponent]
})
export class TourGuidePageModule { }
