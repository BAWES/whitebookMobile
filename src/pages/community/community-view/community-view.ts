import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import { GlobalService } from '../../../providers/global.service';
import { ProductPage } from '../../product/product';

@Component({
  selector: 'page-community-view',
  templateUrl: 'community-view.html'
})
export class CommunityViewPage {

  public vendor: any = [];
  public products : any = [];
  public reviews: any = [];
  public start:number = 0;
  public productView :string;

  public _urlcommunity = '';
  public _urlParamas = '';

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    public httpService: Http,
    public _config: GlobalService
  ) {

    this._urlcommunity = this._config.apiBaseUrl + '/community/view';
  
    this.vendor = params.get('model');
    this.productView = 'grid-view';
    this._urlParamas = '&vendor_id=' + this.vendor.vendor_id;
    this.loadReviews();
    this.loadProducts();
  }
  
  productDetail(id) {
    this.navCtrl.push(ProductPage, { productId:id });
  }

  /**
   * Load product listing
   */
  loadProducts() {
    let url = this._urlcommunity+'?offset=0' + this._urlParamas;
    this.httpService.get(url).subscribe(data => {
      this.products = data.json();
    });
  }

  loadReviews() {
    let url = this._config.apiBaseUrl + '/community/reviews/' + this.vendor.vendor_id;
    this.httpService.get(url).subscribe(data => {
      this.reviews = data.json();
    });
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    let items;
    this.start+=10;
    this.httpService.get(this._urlcommunity +'?offset='+this.start+this._urlParamas).subscribe(data=>{
        items = data.json();
        for(let item of items) {
          this.products.push(item);
        }
      console.log('Begin async operation');
      infiniteScroll.complete();
    })
  }

  /**
   * return html to display rating 
   */
  getReviewIcons(rat){
    let icons = [];
    for (let i = 1; i <= rat; i++) {
			icons.push(i);
    }
    console.log(icons);
    return icons;
  }
}
