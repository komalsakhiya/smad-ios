import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './common/header/header.component';
import { CategorySearchComponent } from './modals/category-search/category-search.component';
import { OrderPipe } from './pipe/orderBy/order.pipe';
import { QrCodeComponent } from './modals/qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { IonicModule } from '@ionic/angular';
import { OfflineDataComponent } from './modals/offline-data/offline-data.component';
import { EnquiryComponent } from './modals/enquiry/enquiry.component';



@NgModule({
  declarations: [
    HeaderComponent,
    CategorySearchComponent,
    OrderPipe,
    QrCodeComponent,
    OfflineDataComponent,
    EnquiryComponent
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    // IonicModule
  ],
  exports: [
    HeaderComponent,
    CategorySearchComponent,
    QrCodeComponent,
    OrderPipe,
    OfflineDataComponent,
    EnquiryComponent
  ],
  entryComponents: [
    OrderPipe,
    CategorySearchComponent,
    QrCodeComponent,
    OfflineDataComponent,
    EnquiryComponent
  ]
})
export class PartialModule { }
