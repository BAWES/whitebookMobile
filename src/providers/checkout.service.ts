import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CheckoutService {

  constructor(
    private httpService : HttpService
  ){
     
  } 
    
  /**
   * Confirm booking 
   */
  confirm(params) {    
    console.log(params);
    let cartSessionId = window.localStorage.getItem('cart-session-id');
    let url = '/checkout/confirm?cart-session-id=' + cartSessionId;
    return this.httpService.post(url, params);
  }
}
 