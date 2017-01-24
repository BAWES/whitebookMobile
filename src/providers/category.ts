import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';
/*
  Generated class for the Category provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Category {
  data: any = null;
  url:any;
  constructor(public http: Http, public _globalService:Global) {
    this.url = _globalService.categoryApiUrl;
    this.data = null;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    // new promise 
    return new Promise(resolve => {
      this.http.get(this.url) // ajax get request to server to get category listing
      .map(res=>res.json())
      .subscribe(data=>{
        this.data = data;
        resolve(this.data);
      })
    })
  }
}
