import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { MyInterceptor } from './interceptor';
import { LoginGuard } from './guard/auth.guard';
import { IonicGestureConfig } from './partial/gesture/ionic-gesture-config';
import { LongPressModule } from 'ionic-long-press';
import { HTTP } from '@ionic-native/http/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'otp'),
    LongPressModule

  ],
  providers: [
    FirebaseAuthentication,
    PhotoViewer,
    CallNumber,
    BarcodeScanner,
    LoginGuard,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: IonicGestureConfig
  },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }


