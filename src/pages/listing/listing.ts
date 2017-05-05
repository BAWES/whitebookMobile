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
  
  public _urlProductListing = '/product/list';
  public _urlParamas:string = '';
  public title : string;
  public id : any;
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
  ) {
    this._urlParamas = '';
  }

  ionViewDidLoad() {
    this.productView = 'grid-view';
    this.id = 'all';
    this.title = this._params.get('title');
    this._urlParamas = '&category_id='+this.id;
    
    if(this._params.get('themeID') != undefined)
    {
      this._urlParamas = '&requestedTheme='+this._params.get('themeID');  
    }    

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
    modal.onDidDismiss(data => {
      this._urlParamas = '&category_id='+this.id;
      // this._urlParamas += '&forSale='+data.filterAvailableForSale;
      this._urlParamas += '&requestedLocation='+data.filterDeliveryArea;
      this._urlParamas += '&requestedDeliverDate='+data.filterDeliveryDate;
      this._urlParamas += '&requestedMinPrice='+data.filterMinPrice;
      this._urlParamas += '&requestedMaxPrice='+data.filterMaxPrice;
      // this._urlParamas += '&requestedCategories='+data.filterCategory;
      this._urlParamas += '&requestedVendor='+data.filterVendors;
      this._urlParamas += '&requestedTheme='+data.filterTheme;
      this.loadProducts();
    });
  }

  /**
   * Load product listing
   */
  loadProducts() {
    this.httpService.get(this._urlProductListing+'?offset=0'+this._urlParamas)
      .subscribe(
        data => {
          this.products = data;
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
    this.httpService.get(this._urlProductListing +'?offset='+this.start+this._urlParamas).subscribe(data=>{
        items = data;
        for(let item of items) {
          this.products.push(item);
        }
      console.log('Begin async operation');
      infiniteScroll.complete();
    })
  }
}
