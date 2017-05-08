import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CheckoutService {

  constructor(
    private httpService : HttpService,
  ){
     
  } 
    
  /**
   * Confirm booking 
   */
  confirm() {
    return this.httpService.get('/checkout/confirm');
  }
}
