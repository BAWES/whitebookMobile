import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { GlobalService } from '../providers/global.service';
import { Authentication } from '../providers/auth.service';

@Injectable()
export class CartService {
  
  public _urlCart:string = '/cart';
  public count:number = 0;
  
  public cartSessionId: string;
  public isUserLogged;

  constructor(
    private httpService : HttpService,
    public http: Http,
    public authService: Authentication,
    public globalService: GlobalService
  ){
    this.isUserLogged = this.authService.getAccessToken();

    if(!this.isUserLogged) 
      this.getCartSessionId();
  } 

  /**
   * Get cart session id to use cart 
   * without login 
   */
  getCartSessionId() {

    this.cartSessionId = window.localStorage.getItem('cart-session-id');

    if(this.cartSessionId && this.cartSessionId != 'undefined') {
      return true;
    }      

    let url = this.globalService._ApiUrl + this._urlCart + '/cart-session-id';
    this.http.get(url).subscribe(response => {
      this.cartSessionId = response.json().cart_session_id;
      window.localStorage.setItem('cart-session-id', this.cartSessionId);
    });
  }

  loadAreas() {
    return this.httpService.get('/address/location');
  }    

  /**
   * List cart items 
   */
  list() {

    let area_id = window.localStorage.getItem('delivery-location');
    let delivery_date = window.localStorage.getItem('delivery-date');
    let time_slot = window.localStorage.getItem('event_time');

    let url = this._urlCart + '?';    
    if(area_id)
      url += 'area_id=' + area_id;
    if(delivery_date)  
      url += '&delivery_date=' + delivery_date;
    if(time_slot) 
      url += '&time_slot=' + time_slot;

    return this.httpService.get(url + '&cart-session-id=' + this.cartSessionId);
  }

  /**
   * Add item to cart 
   */
  add(params: any) {

    window.localStorage.setItem('delivery-location', params.area_id);
    window.localStorage.setItem('delivery-date', params.delivery_date);
    window.localStorage.setItem('event_time', params.time_slot);

    return this.httpService.post(
      this._urlCart  + '?cart-session-id=' + this.cartSessionId, 
      params
    );
  }

  /**
   * Remove item from cart 
   */
  delete(cart_id: number) {
    let url = this._urlCart+'?cart_id='+cart_id + '&cart-session-id=' + this.cartSessionId;
    return this.httpService.delete(url);
  }
}
