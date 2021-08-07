import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPageRoutingModule } from './scanner-routing.module';

import { ScannerPage } from './scanner.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PartialModule } from '../../partial/partial.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule,
    PartialModule
  ],
  declarations: [ScannerPage],
  providers: [
    BarcodeScanner
  ]
})
export class ScannerPageModule { }
