import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ProductPage } from '../product/product';
import { CheckoutCartPage } from '../checkout/checkout-cart/checkout-cart';
import { SearchItemPage } from '../search-item/search-item';
import { SearchFilterPage } from '../search-filter/search-filter';
import { GlobalService } from '../../providers/global.service';
import { CartService } from '../../providers/cart.service';

@Component({
  selector: 'page-listing',
  templateUrl: 'listing.html'
})
export class ListingPage {
  
  public _urlProductListing = '';
  public _urlParamas:string = '';
  public title : string;
  public id : any;
  public productView :string;
  public category:any;
  public products : any;
  public start:number = 0;
  public cartCount:number = 0;

  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public modalCtnl: ModalController,
    public httpService: Http,
    public cartService: CartService,
    public _config: GlobalService
  ) {
    this._urlParamas = '';
    this._urlProductListing = this._config.apiBaseUrl + '/product/list';
  }

  ionViewDidLoad() {
    this.productView = 'grid-view';
    this.id = this._params.get('id');
    this.title = this._params.get('title');
    this._urlParamas = '&category_id='+this.id;
    
    if(this._params.get('themeID') != undefined)
    {
      this._urlParamas = '&requestedTheme='+this._params.get('themeID');  
    }    

    this.loadProducts();
  }

  ionViewWillEnter() {    
    this.getCartCount();
  } 

  productDetail(id) {
    this.navCtrl.push(ProductPage,{productId:id});
  }
  
  openModel() {
    let modal = this.modalCtnl.create(CheckoutCartPage);
    modal.present();
    modal.onDidDismiss(data => { 
      this.getCartCount();
    });
  }

  getCartCount() {
    this.cartService.count().subscribe(data => {
      this.cartCount = data;
    });
  }

  changeView(view) {
    this.productView = view;
  }

  openSearchModel() {
    let modal = this.modalCtnl.create(SearchItemPage);
    modal.present();
  }

  /**
   * Creates an object from URL encoded data
   */
  createObjFromURI(uri) {
    var chunks = uri.split('&');
    var params = Object();

    for (var i=0; i < chunks.length ; i++) {
        var chunk = chunks[i].split('=');
        if(chunk[0].search("\\[\\]") !== -1) {
            if( typeof params[chunk[0]] === 'undefined' ) {
                params[chunk[0]] = [chunk[1]];

            } else {
                params[chunk[0]].push(chunk[1]);
            }


        } else {
            params[chunk[0]] = chunk[1];
        }
    }

    return params;
  }

  searchFilter() {
    let urlParams = this.createObjFromURI(this._urlParamas);
    
    let modal = this.modalCtnl.create(SearchFilterPage, urlParams);
    modal.present();
    modal.onDidDismiss(data => {
      this._urlParamas = '&category_id='+this.id;

      if(data.filterDeliveryArea)
        this._urlParamas += '&requestedLocation=' + data.filterDeliveryArea;

      if(data.filterDeliveryDate)
        this._urlParamas += '&requestedDeliverDate='+data.filterDeliveryDate;
      
      if(data.filterDeliveryTime)
        this._urlParamas += '&requestedDeliverTime='+data.filterDeliveryTime;

      if(data.filterMinPrice)
        this._urlParamas += '&requestedMinPrice='+data.filterMinPrice;

      if(data.filterMaxPrice)
        this._urlParamas += '&requestedMaxPrice='+data.filterMaxPrice;
      
      if(data.filterVendors)
        this._urlParamas += '&requestedVendor='+data.filterVendors;

      if(data.filterTheme)
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
    this.httpService.get(this._urlProductListing +'?offset='+this.start+this._urlParamas).subscribe(data=>{
        items = data.json();
        for(let item of items) {
          this.products.push(item);
        }
      console.log('Begin async operation');
      infiniteScroll.complete();
    })
  }
}
