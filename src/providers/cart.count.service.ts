import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Authentication } from '../providers/auth.service';
@Injectable()
export class CartCountService {
  public _urlCartUrl:string = '/cart/count';
  public count:number = 0;
  constructor(
    private httpService : HttpService,
    public authService: Authentication
  ){
      this.loadCartCount();
  } 

  loadCartCount() {
    if (this.authService.getAccessToken()) {
      this.httpService.get(this._urlCartUrl).subscribe(total=>{
        this.count = total;
      });
    }
  }
}
