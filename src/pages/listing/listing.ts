import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ProductPage } from '../product/product';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart';
import { SearchItemPage } from '../search-item/search-item';
import { SearchFilterPage } from '../search-filter/search-filter';
import { HttpService } from '../../providers/http.service';
import { GlobalService } from '../../providers/global.service';
import { CartCountService } from '../../providers/cart.count.service';

@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html'
})
export class ListingPage {
  
  public _urlProductListing = '/product/list?category_id=';
  
  public title : string;
  public id : number;
  public productView :string;
  public category:any;
  public products : any;
  public start:number = 0;

  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public modalCtnl: ModalController,
    public httpService: HttpService,
    public _config: GlobalService,
    public _cartCount:CartCountService
  ) {}

  ionViewDidLoad() {
    this.productView = 'grid-view';
    this.id = this._params.get('id');
    this.title = this._params.get('title');
    this.loadProducts();
  }

  productDetail(id) {
    this.navCtrl.push(ProductPage,{productId:id});
  }
  
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
    modal.onDidDismiss(data => { 
      this._cartCount.loadCartCount();
    });
  }

  changeView(view) {
    this.productView = view;
  }

  openSearchModel() {
    let modal = this.modalCtnl.create(SearchItemPage);
    modal.present();
  }

  searchFilter() {
    let modal = this.modalCtnl.create(SearchFilterPage);
    modal.present();
  }

  /**
   * Load product listing
   */
  loadProducts() {
    this.httpService.get(this._urlProductListing+this.id+'&offset=0').subscribe(data => {this.products = data});
  }

  /*
  * Method perform infinite scroll which 
  * will load more data just like pagination
  */
  doInfinite(infiniteScroll) {
    let items;
    this.start+=10;
    this.httpService.get(this._urlProductListing +'?category_id='+this.category+'&offset='+this.start).subscribe(data=>{
        items = data;
        for(let item of items) {
          this.products.push(item);
        }
      infiniteScroll.complete();
    })
  }
}
