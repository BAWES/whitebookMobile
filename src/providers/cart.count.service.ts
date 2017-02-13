import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CartCountService {
  public _urlCartUrl:string = '/cart/count';
  public count:number = 0;
  constructor(
    private httpService : HttpService
  ){
    this.loadCartCount();
  } 

  loadCartCount() {
    console.log('checkout cart count');
    this.httpService.get(this._urlCartUrl).subscribe(total=>{
      this.count = total;
    });
  }
}
