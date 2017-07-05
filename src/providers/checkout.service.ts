import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CheckoutService {

  constructor(
    private httpService : HttpService,
    public translateService: TranslateService
  ){
     
  } 
    
  /**
   * Confirm booking 
   */
  confirm(params) {    
    let cartSessionId = window.localStorage.getItem('cart-session-id');
    let url = '/checkout/confirm?cart-session-id=' + cartSessionId + '&language=' + this.translateService.currentLang;
    return this.httpService.post(url, params);
  }
}
 