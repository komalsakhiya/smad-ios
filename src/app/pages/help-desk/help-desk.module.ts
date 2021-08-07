import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpDeskPageRoutingModule } from './help-desk-routing.module';

import { HelpDeskPage } from './help-desk.page';
import { PartialModule } from 'src/app/partial/partial.module';
import {TimeAgoPipe} from 'time-ago-pipe';
import { HelpDeskDetailComponent } from './help-desk-detail/help-desk-detail.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpDeskPageRoutingModule,
    PartialModule,
    ReactiveFormsModule
  ],
  declarations: [
    HelpDeskPage,
    TimeAgoPipe,
    HelpDeskDetailComponent,
    AddTicketComponent
  ]
})
export class HelpDeskPageModule {}
