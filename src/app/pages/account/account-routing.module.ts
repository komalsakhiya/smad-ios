import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';
import { FavouriteAdComponent } from './favourite-ad/favourite-ad.component';
import { MyadsComponent } from './myads/myads.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
    children: [
      {
        path: '',
        redirectTo: 'myads',
        pathMatch: 'full'
      },
      // {
      //   path: 'myads',
      //   component: MyadsComponent
      // },
      {
        path: 'favouriteads',
        component: FavouriteAdComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule { }
