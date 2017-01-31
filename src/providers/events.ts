import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';
import { Base } from './base';
import { AuthHttpService } from './authhttp.service';

@Injectable()
export class Event {
  
  private url: string;
  private data: any;
  private _urlEventUrl: string = "/event";

  constructor(public _http: Http, public _globalService:Global,public _baseService: Base, public _authHttpService: AuthHttpService) {
    this.url = _globalService._ApiUrl;
  }

  eventlist(){
      return this._authHttpService.get(this._urlEventUrl);
  }

  
}
