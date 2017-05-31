import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { GlobalService } from '../providers/global.service';
import { Authentication } from '../providers/auth.service';

@Injectable()
export class CartService {
  
  public _urlCart:string = '/cart';
  public count:number = 0;
  
  constructor(
    private httpService : HttpService,
    public http: Http,
    public authService: Authentication,
    public globalService: GlobalService
  ){

  } 

  loadAreas() {
    return this.httpService.get('/address/location');
   // return this.http.get(this.globalService._ApiUrl + '/address/location');
  }    

  /**
   * List cart items 
   */
  list() {

    let area_id = window.localStorage.getItem('delivery-location');
    let delivery_date = window.localStorage.getItem('delivery-date');
    let time_slot = window.localStorage.getItem('event_time');

    return this.httpService.get(
      this._urlCart + '?area_id=' + area_id + '&delivery_date=' + delivery_date + '&time_slot=' + time_slot
    );
  }

  /**
   * Add item to cart 
   */
  add(params: any) {

    window.localStorage.setItem('delivery-location', params.area_id);
    window.localStorage.setItem('delivery-date', params.delivery_date);
    window.localStorage.setItem('event_time', params.time_slot);

    return this.httpService.post(this._urlCart, params);
  }

  /**
   * Remove item from cart 
   */
  delete(cart_id: number) {
    return this.httpService.delete(this._urlCart+'?cart_id='+cart_id);
  }
}
