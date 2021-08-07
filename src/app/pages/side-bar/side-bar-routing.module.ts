import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideBarPage } from './side-bar.page';

const routes: Routes = [
  {
    path: '',
    component: SideBarPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'folder/:id',
        loadChildren: () => import('../folder/folder.module').then(m => m.FolderPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'myads',
        loadChildren: () => import('../account/myads/myads.module').then(m => m.MyadsModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'clickwallet',
        loadChildren: () => import('../clickwallet/clickwallet.module').then(m => m.ClickwalletPageModule)
      },
      {
        path: 'cmtransactions',
        loadChildren: () => import('../cmtransactions/cmtransactions.module').then(m => m.CmtransactionsPageModule)
      },
      {
        path: 'encash-voucher',
        loadChildren: () => import('../voucher/encash-voucher/encash-voucher.module').then(m => m.EncashVoucherModule)
      },
      {
        path: 'my-voucher',
        loadChildren: () => import('../voucher/my-voucher/my-voucher.module').then(m => m.MyVoucherModule)
      },
      {
        path: 'smad-voucher',
        loadChildren: () => import('../voucher/smad-voucher/smad-voucher.module').then(m => m.SmadVoucherModule)
      },

      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'partner-list',
        loadChildren: () => import('../partner-list/partner-list.module').then(m => m.PartnerListPageModule)
      },
      {
        path: 'help-desk',
        loadChildren: () => import('../help-desk/help-desk.module').then(m => m.HelpDeskPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'scanner',
        loadChildren: () => import('../scanner/scanner.module').then(m => m.ScannerPageModule)
      },
      {
        path: 'paycmcoin',
        loadChildren: () => import('../partner-list/pay-cm-coin/pay-cm-coin.component').then(m => m.PayCmCoinComponent)
      },
      {
        path: 'share',
        loadChildren: () => import('../share/share.module').then( m => m.SharePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideBarPageRoutingModule { }
