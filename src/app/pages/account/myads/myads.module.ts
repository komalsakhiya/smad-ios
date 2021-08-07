import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyadsComponent } from './myads.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ViewCountComponent } from './view-count/view-count.component';
import { StagesComponent } from './stages/stages.component';
import { PartialModule } from 'src/app/partial/partial.module';



@NgModule({
  declarations: [MyadsComponent,ViewCountComponent,StagesComponent],
  imports: [
    CommonModule,
    IonicModule,
    PartialModule,
    RouterModule.forChild([
      {
        path: '',
        component: MyadsComponent
      }
    ])
  ]
})
export class MyadsModule { }
