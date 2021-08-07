import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PartialModule } from '../../partial/partial.module';
import { AdDetailsComponent } from './ad-details/ad-details.component';
import { EnquiryComponent } from './enquiry/enquiry.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    PartialModule
  ],
  declarations: [
    HomePage,
    AdDetailsComponent,
    EnquiryComponent
  ]
})
export class HomePageModule {}
