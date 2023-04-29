import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import firebase from 'firebase/compat/app';
// import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

var config = {
  apiKey: 'AIzaSyAAWTVKhSzraA-9vaYlvkyGWeyvdGdLHZk',
  authDomain: 'loadgo-a65ee.firebaseapp.com',
  projectId: 'loadgo-a65ee',
  storageBucket: 'loadgo-a65ee.appspot.com',
  messagingSenderId: '649379582931',
  appId: '1:649379582931:web:ee48f1052913ae19761526',
};

export class PhoneNumber {
  country: string = '';
  area?: string;
  prefix?: string;
  line?: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  windowRef: any;
  toggle = true;

  phoneNumber: any;
  phone:string='+91';
  reCaptchaVerifier: any;
  constructor(private router: Router) {}

  // auth = getAuth();

  ngOnInit() {
    firebase.initializeApp(config);
    this.windowRef = window;
    

    // this.auth.languageCode = 'it';
  }

  getOTP() {
    // this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //   'sign-in-button',
    //   { size: 'invisible' }
    // );

    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
      }
    );

    this.windowRef.recaptchaVerifier.render().then((widgetId: any) => {
      this.windowRef.recaptchaWidgetId = widgetId;
    });

    this.reCaptchaVerifier = this.windowRef.recaptchaVerifier;
    
    this.phone=this.phone + this.phoneNumber
    
    firebase
      .auth()
      .signInWithPhoneNumber(this.phone, this.reCaptchaVerifier)
      .then((confimationResult: any) => {
        this.windowRef.confirmationResult = confimationResult;
        // console.log(confimationResult);
        localStorage.setItem(
          'verificationId',
          JSON.stringify(confimationResult.verificationId)
        );
        // this.router.navigate(['/otpAuthentication']);
        this.toggle = false;
      })
      .catch((error) => {
        alert(error.message);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }

  resendOTP() {
  firebase
    .auth()
    .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
    .then((confimationResult: any) => {
      this.windowRef.confirmationResult = confimationResult;
      // console.log(confimationResult);
      localStorage.setItem(
        'verificationId',
        JSON.stringify(confimationResult.verificationId)
      );
      // this.router.navigate(['/otpAuthentication']);
      
    })
    .catch((error) => {
      console.log('error=>>',error)
      grecaptcha.reset(this.windowRef.recaptchaWidgetId);

    });
  }
}
