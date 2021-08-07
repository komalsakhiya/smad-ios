import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { MyadsComponent } from './myads/myads.component';
import { PartialModule } from 'src/app/partial/partial.module';
import { FavouriteAdComponent } from './favourite-ad/favourite-ad.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    PartialModule
  ],
  declarations: [
    AccountPage,
    // MyadsComponent,
    FavouriteAdComponent
  ]
})
export class AccountPageModule { }
