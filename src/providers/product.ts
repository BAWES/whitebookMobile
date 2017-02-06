import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Global } from './global';
/*
  Generated class for the Product provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Product {
  dataProduct:any = null;
  dataProductList:any = null;
  dataAreaList:any = null;
  url : string;
  productListUrl : string;
  constructor(public http: Http, public _globalService:Global) {
    this.url = _globalService.productApiUrl;
  }

  // Product Detail Api Request
  loadProduct(product_id){
    return new Promise(resolve => {
      this.http.get(this.url+'/detail?product_id='+product_id)
      .map(res=>res.json())
      .subscribe(data => {
        this.dataProduct = data;
        resolve(this.dataProduct)
      })
    });
  }
  
  // Product List Api Request
  loadProductList(category_id){
    return new Promise(resolve => {
      this.http.get(this.url+'/list?category_id='+category_id)
      .map(res=>res.json())
      .subscribe(data => {
        this.dataProductList = data;
        resolve(this.dataProductList)
      })
    });
  }
  
  // Product Area List Api Request
  loadAreaList(vendor_id){
    return new Promise(resolve => {
      this.http.get(this.url+'/area?vendor_id='+vendor_id)
      .map(res=>res.json())
      .subscribe(data => {
        this.dataAreaList = data;
        resolve(this.dataAreaList)
      })
    });
  }

}
