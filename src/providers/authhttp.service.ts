import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Platform, Events } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import { Global } from './global';
import { Authentication } from './auth.service';

/*
  Handles all Authorized HTTP functions with Bearer Token
*/
@Injectable()
export class AuthHttpService {

  constructor(
    private _http: Http,
    private _auth: Authentication,
    private _config: Global,
    private _platform: Platform,
    private _events: Events
    ) {}

  /**
   * Requests via GET verb
   * @param {string} endpointUrl
   * @returns {Observable<any>}
   */
  get(endpointUrl: string){
    return new Promise(resolve => {  
      const url = this._config._ApiUrl + endpointUrl;
      this._http.get(url, {headers: this._buildAuthHeaders()})
        .catch((err) => this._handleError(err))
        .take(1)
        .map(res => res.json())
        .subscribe(data => {
            resolve(data)
        })
    });
  }

  /**
   * Requests via POST verb
   * @param {string} endpointUrl
   * @param {*} params
   * @returns {Observable<any>}
   */
  post(endpointUrl: string, params: any){
    return new Promise(resolve => {
      const url = this._config._ApiUrl + endpointUrl;
      this._http.post(url, JSON.stringify(params), {headers: this._buildAuthHeaders()})
        .catch((err) => this._handleError(err))
        .take(1)
        .map(res => res.json())
        .subscribe(data => {
            resolve(data)
        })
    });
  }

  /**
   * Requests via PATCH verb
   * @param {string} endpointUrl
   * @param {*} params
   * @returns {Observable<any>}
   */
  patch(endpointUrl: string, params: any){
    return new Promise(resolve => {
      const url = this._config._ApiUrl + endpointUrl;
      this._http.patch(url, JSON.stringify(params), {headers: this._buildAuthHeaders()})
          .catch((err) => this._handleError(err))
          .take(1)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data)
        })
      });
  }

  /**
   * Requests via DELETE verb. Params should be a part of the url string 
   * similar to get requests.
   * @param {string} endpointUrl
   * @returns {Observable<any>}
   */
  delete(endpointUrl: string) {
    return new Promise(resolve => {
    const url = this._config._ApiUrl + endpointUrl;
      this._http.delete(url, {headers: this._buildAuthHeaders()})
          .catch((err) => this._handleError(err))
          .take(1)
          .map((res: Response) => res.json())
          .subscribe(data => {
            resolve(data);
        });
    });
  }

  /**
   * Build the Auth Headers for All Verb Requests
   * @returns {Headers}
   */
  private _buildAuthHeaders(){
    // Get Bearer Token from Auth Service
    const bearerToken = this._auth.getAccessToken();

    // Build Headers with Bearer Token
    const headers = new Headers();
    headers.append("Authorization", "Bearer "+ bearerToken);
    headers.append("Content-Type", "application/json");

    return headers;
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

      // Handle Expired Session Error
      if (error.status === 401) {
          this._auth.logout('Session expired, please log back in.');
          return Observable.empty<Response>();
      }

      alert("Error: "+errMsg);

      return Observable.throw(errMsg);
  }

}
