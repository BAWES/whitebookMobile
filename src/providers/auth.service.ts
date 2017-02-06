import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { Platform, Events } from 'ionic-angular';
import { InAppBrowser, NativeStorage } from 'ionic-native';

import { Global } from './global';

@Injectable()
export class Authentication {
  public isLoggedIn = false;

  // Logged in user details
  private _accessToken;
  public email: string;

  private _browser: InAppBrowser;
  private _browserLoadEvents;
  private _browserCloseEvents;

  private url : string;
  private data : any;
  
  private _urlBasicAuth: string = "/auth/login";
  private _urlCreateAccount: string = "/auth/create-account";
  private _urlRequestResetPassword: string = "/auth/request-reset-password";
  
  constructor(
    private _config:Global,
    private _http: Http,
    private _platform: Platform,
    private _events: Events
    ) {
    this.url = _config._ApiUrl;
    _platform.ready().then(() => {
        this._updateLoginStatus();
      });
  }

  /**
   * Sets this.isLoggedIn based on availability of BEARER Access Token
   */
  private _updateLoginStatus(){
    if(this.getAccessToken()){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
      this._events.publish("user:logout");
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
      NativeStorage.remove("loggedInUser").then(() => {
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
      NativeStorage.setItem('loggedInUser', {
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
      NativeStorage.getItem('loggedInUser')
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
    return new Promise(resolve => {
      let header = new Headers();
      header.append('Content-Type', 'application/json');    
      header.append("Authorization", "Basic "+ btoa(`${email}:${password}`));

      return this._http.get(
        this.url+this._urlBasicAuth, 
          {headers: header}
        )
      .map(res => res.json())
      .subscribe(
        data => {
          this.data = data;
          resolve(this.data);
        },
      (error => { 
        this.data = JSON.parse(error._body);
        resolve(this.data) 
      })
      );
    });
  }


  resetPassword(emailInput: string){
    return new Promise(resolve => {
      let headers = new Headers({'Content-Type': 'application/json'});
      
      return this._http.post(
        this.url+this._urlRequestResetPassword, 
        JSON.stringify({'email': emailInput}), 
        {headers: headers}
      )
      .map(res => res.json())
      .subscribe(
          data => {
            this.data = data;
            resolve(this.data);
          },
        (error => { 
          this.data = JSON.parse(error._body);
          resolve(this.data) 
        })
      );
    });
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
    return new Promise(resolve => {
      let headers = new Headers({'Content-Type': 'application/json'});
      
      return this._http.post(
        this.url+this._urlCreateAccount, 
        JSON.stringify({
          'first_name': firstName,
          'last_name': lastName,
          'email': email,
          'password': password,
          'date_of_birth': dob,
          'gender': gender,
          'mobile_number': mobileNumber,
        }), {headers: headers})
        .map(res => res.json())
        .subscribe(
            data => {
              this.data = data;
              resolve(this.data);
            },
          (error => { 
            this.data = JSON.parse(error._body);
            resolve(this.data) 
          })
        );
    });
  }
}