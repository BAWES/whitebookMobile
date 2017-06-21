import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AlertController,LoadingController} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { Platform, Events } from 'ionic-angular';
//import { InAppBrowser, NativeStorage } from 'ionic-native';
import { NativeStorage } from '@ionic-native/native-storage';

import { GlobalService } from './global.service';

@Injectable()
export class Authentication {
  public isLoggedIn = false;

  // Logged in user details
  private _accessToken;
  public email: string;

  //private _browserLoadEvents;
  //private _browserCloseEvents;

  private url : string;
  //private data : any;
  
  private _urlBasicAuth: string = "/auth/login";
  private _urlCreateAccount: string = "/auth/create-account";
  private _urlRequestResetPassword: string = "/auth/request-reset-password";
  
  constructor(
    private _config:GlobalService,
    private _http: Http,
    private _platform: Platform,
    private _events: Events,
    private nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    ) {
    this.url = _config.apiBaseUrl;
    _platform.ready().then(() => {
        this._updateLoginStatus();
      });
  }

  /**
   * Sets this.isLoggedIn based on availability of BEARER Access Token
   */
  private _updateLoginStatus(){
    if (this.getAccessToken()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
      this._events.publish("user:logout");
      console.log('logout');
    }
  }

    /**
   * Logs a user out by setting logged in to false and clearing token from localStorage
   * @param {string} [reason]
   */
  logout(reason?: string){
    // Remove from LocalStorage
    window.localStorage.removeItem('bearer');
    window.localStorage.removeItem('email');

    // Remove from NativeStorage if this is iOS or Android
    if(this._platform.is("cordova") && (this._platform.is("ios") || this._platform.is("android"))){
      this.nativeStorage.remove("loggedInUser").then(() => {
        // alert("deleted from nativestorage");
      });
    }

    this._accessToken = null;
    this._updateLoginStatus();

    this._events.publish('user:logout', reason?reason:false);
  }

  /**
   * Set the access token
   * @param {string} token
   * @param {number} id
   * @param {string} name
   * @param {string} email
   */
  setAccessToken(token: string, email: string){
    this._accessToken = token;
    this.email = email;

    // Update Public Login Status
    this._updateLoginStatus();

    // Save Token in LocalStorage
    window.localStorage.setItem('bearer', token);
    window.localStorage.setItem('email', email);

    // Save in NativeStorage if iOS and Android
    if(this._platform.is("cordova") && (this._platform.is("ios") || this._platform.is("android"))){
      this.nativeStorage.setItem('loggedInUser', {
        'bearer': token,
        'email': email
      }).then(
        () => {
          // alert("Saved in nativestorage");
        },
        error => console.error('Error storing access token', error)
      );
    }

    // Log User In by Triggering Event that Access Token has been Set
    this._events.publish('user:login', 'TokenSet');
  }

  /**
   * Get Access Token from Service or LocalStorage
   * @returns {string} token
   */
  getAccessToken(){
    // Return Access Token if set already
    if(this._accessToken){
      return this._accessToken;
    }

    // Check Local Storage and Try Again
    if(localStorage.getItem("bearer")){
      this.setAccessToken(
        localStorage.getItem("bearer"),
        localStorage.getItem("email"));
      return this.getAccessToken();
    }

    // Check Native Storage and Try Again
    // Native storage is implemented because some devices clear LocalStorage regularly to save memory
    if(this._platform.is("cordova") && (this._platform.is("ios") || this._platform.is("android"))){
      this.nativeStorage.getItem('loggedInUser')
      .then(
        data => {
          this.setAccessToken(data.bearer, data.email);
          return this.getAccessToken();
        },
        error => console.error(error)
      );
    }
    // No Access Token Available
    return false;
  }

  login(email: string,password: string) {
    const authHeader = new Headers();
    authHeader.append('Content-Type', 'application/json');    
    authHeader.append("Authorization", "Basic "+ btoa(`${email}:${password}`));
    const url = this.url + this._urlBasicAuth;
    return this._http.get(url, {headers: authHeader})
      //.catch((err) => this._handleError(err))
      .first()
      .map((res: Response) => res.json());
  }

  resetPassword(emailInput: string){
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = this.url+this._urlRequestResetPassword;
    return this._http.post(url, JSON.stringify({'email': emailInput}), {headers: headers})
            .first()
            .map((res: Response) => res.json());
  }

createAccount(
  firstName:string, 
  lastName:string, 
  email: string, 
  password: string,
  dob: any,
  gender: string,
  mobileNumber: number,
  ){
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = this.url+this._urlCreateAccount;
    return this._http.post(url, JSON.stringify({
        'first_name': firstName,
          'last_name': lastName,
          'email': email,
          'password': password,
          'date_of_birth': dob,
          'gender': gender,
          'mobile_number': mobileNumber,
      }), {headers: headers})
      .first()
      .map((res: Response) => res.json());
  }

  /**
   * Handles Caught Errors from All Authorized Requests Made to Server
   * @returns {Observable} 
   */
  private _handleError(error: any): Observable<any> {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';

      // Handle Bad Requests
      // This error usually appears when agent attempts to handle an 
      // account that he's been removed from assigning
      if (error.status === 400) {
          this._events.publish("accountAssignment:removed");
          return Observable.empty<Response>();
      }

      // Handle No Internet Connection Error
      if (error.status == 0) {
          this._events.publish("internet:offline");
          //this._auth.logout("Unable to connect to Plugn servers. Please check your internet connection.");
          return Observable.empty<Response>();
      }
    
      let alert = this.alertCtrl.create({
        title: 'Error:',
        subTitle: errMsg,
        buttons: ['OK']
      });
      alert.present(prompt);
      return Observable.throw(errMsg);
  }
}