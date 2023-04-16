import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore'
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';


var config = {
  apiKey: 'AIzaSyAAWTVKhSzraA-9vaYlvkyGWeyvdGdLHZk',
  authDomain: 'loadgo-a65ee.firebaseapp.com',
  projectId: 'loadgo-a65ee',
  storageBucket: 'loadgo-a65ee.appspot.com',
  messagingSenderId: '649379582931',
  appId: '1:649379582931:web:ee48f1052913ae19761526',
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  toggle=true

  phoneNumber: any;
  reCaptchaVerifier: any;
  constructor(private router: Router) {}

  ngOnInit() {
    firebase.initializeApp(config);
  }

  getOTP() {
    this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      { size: 'invisible' }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaVerifier)
      .then((confimationResult: any) => {
        console.log(confimationResult);
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
}
