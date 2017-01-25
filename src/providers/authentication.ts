import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';

@Injectable()
export class Authentication {
  private url : string;
  private data : any;
  
  private _urlBasicAuth: string = "/auth/login";
  private _urlCreateAccount: string = "/auth/create-account";
  private _urlRequestResetPassword: string = "/auth/request-reset-password";
  private _urlResendVerificationEmail: string = "/auth/resend-verification-email";

  constructor(public _http: Http, public _globalService:Global) {
    this.url = _globalService._ApiUrl;
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
