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

/*
  Handles all Authorized HTTP functions with Bearer Token
*/
@Injectable()
export class HttpService {

  constructor(
    private _http: Http,
    private _config: Global,
    private _platform: Platform,
    private _events: Events
    ) {}

  /**
   * Requests via GET verb
   * @param {string} endpointUrl
   * @returns {Observable<any>}
   */
  get(endpointUrl: string): Observable<any>{
    const url = this._config._ApiUrl + endpointUrl;

    return this._http.get(url)
              .catch((err) => this._handleError(err))
              .take(1)
              .map((res: Response) => res.json());
  }

  /**
   * Requests via POST verb
   * @param {string} endpointUrl
   * @param {*} params
   * @returns {Observable<any>}
   */
  post(endpointUrl: string, params: any): Observable<any>{
    const url = this._config._ApiUrl + endpointUrl;

    return this._http.post(url, JSON.stringify(params))
              .catch((err) => this._handleError(err))
              .take(1)
              .map((res: Response) => res.json());
  }

  /**
   * Requests via PATCH verb
   * @param {string} endpointUrl
   * @param {*} params
   * @returns {Observable<any>}
   */
  patch(endpointUrl: string, params: any): Observable<any>{
    const url = this._config._ApiUrl + endpointUrl;

    return this._http.patch(url, JSON.stringify(params))
              .catch((err) => this._handleError(err))
              .take(1)
              .map((res: Response) => res.json());
  }

  /**
   * Requests via DELETE verb. Params should be a part of the url string 
   * similar to get requests.
   * @param {string} endpointUrl
   * @returns {Observable<any>}
   */
  delete(endpointUrl: string): Observable<any>{
    const url = this._config._ApiUrl + endpointUrl;

    return this._http.delete(url)
              .catch((err) => this._handleError(err))
              .take(1)
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
      
      alert("Error: "+errMsg);

      return Observable.throw(errMsg);
  }
}