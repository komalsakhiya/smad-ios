import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SideBarPageRoutingModule } from './side-bar-routing.module';

import { SideBarPage } from './side-bar.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SideBarPageRoutingModule
  ],
  declarations: [SideBarPage],
  providers: [
    SocialSharing
  ]
})
export class SideBarPageModule { }
