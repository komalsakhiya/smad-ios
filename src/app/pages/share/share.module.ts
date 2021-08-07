import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharePageRoutingModule } from './share-routing.module';

import { SharePage } from './share.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharePageRoutingModule
  ],
  declarations: [SharePage],
  providers: [
    SocialSharing
  ]
})
export class SharePageModule { }
