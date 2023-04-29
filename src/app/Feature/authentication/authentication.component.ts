import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NgxOtpInputConfig } from 'ngx-otp-input';

var config = {
  apiKey: 'AIzaSyAAWTVKhSzraA-9vaYlvkyGWeyvdGdLHZk',
  authDomain: 'loadgo-a65ee.firebaseapp.com',
  projectId: 'loadgo-a65ee',
  storageBucket: 'loadgo-a65ee.appspot.com',
  messagingSenderId: '649379582931',
  appId: '1:649379582931:web:ee48f1052913ae19761526',
};

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  @Output() resendOTP: EventEmitter<any> =  new EventEmitter<any>();
  otp!: string;
  verify: any;

  toggle = false;

  constructor(private router: Router) {}
  ngOnInit() {
    firebase.initializeApp(config);

    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
    numericInputMode: true,
    autofocus: true,
    isPasswordInput: false,
    classList: {
      input: 'inputStyles',
      inputFilled: '',
      inputDisabled: '',
      inputSuccess: '',
      inputError: '',
    },
  };

  onOtpChange(otpCode: any) {
    this.otp = otpCode;

    this.otp = this.otp.toString().replace(/,/g, '');
    console.log(this.otp);
  }

  handleClick() {
    var credentials = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    firebase
      .auth()
      .signInWithCredential(credentials)
      .then((response) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.toggle = true;
      })
      .catch((error: any) => {
        alert(error.message);
      });
  }
  onResendOTPClicked(e:any) {
    this.resendOTP.emit(e)
  }
}
