import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import { GlobalService } from '../../../providers/global.service';
import { ProductPage } from '../../product/product';

@Component({
  selector: 'page-directory-view',
  templateUrl: 'directory-view.html'
})
export class DirectoryViewPage {

  public vendor: any = [];
  public products : any = [];
  public start:number = 0;
  public productView :string;

  public _urlDirectory = '';
  public _urlParamas = '';

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public httpService: Http,
    public _config: GlobalService
  ) {

    this._urlDirectory = this._config._ApiUrl + '/directory/view';
  
    this.vendor = params.get('model');
    this.productView = 'grid-view';
    this._urlParamas = '&vendor_id=' + this.vendor.vendor_id;
    this.loadProducts();
  }
  
  productDetail(id) {
    this.navCtrl.push(ProductPage, { productId:id });
  }

  /**
   * Load product listing
   */
  loadProducts() {
    this.httpService.get(this._urlDirectory+'?offset=0'+this._urlParamas)
      .subscribe(
        data => {
          this.products = data.json();
        }
      );
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    let items;
    this.start+=10;
    this.httpService.get(this._urlDirectory +'?offset='+this.start+this._urlParamas).subscribe(data=>{
        items = data.json();
        for(let item of items) {
          this.products.push(item);
        }
      console.log('Begin async operation');
      infiniteScroll.complete();
    })
  }
}
