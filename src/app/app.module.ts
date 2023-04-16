import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule} from '@angular/google-maps';
import { AppComponent } from './app.component';
import { HomeComponent } from './Core/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './Feature/authentication/authentication.component';
import { LoginComponent } from './Feature/login/login.component';
import { NgxOtpInputModule } from 'ngx-otp-input';

import { FormsModule } from '@angular/forms';

// Firebase service + environment module 
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environment/environment';

// const key = environment.apiKey;
// // const src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,

    HttpClientModule,
    GoogleMapsModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxOtpInputModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}














