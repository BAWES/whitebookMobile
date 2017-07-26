import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController } from 'ionic-angular';

//services 
import { GlobalService } from '../../../providers/global.service';
import { HttpService } from '../../../providers/http.service';

//pages 
import { ProductPage } from '../../product/product';
import { VendorReviewPage } from '../vendor-review/vendor-review';

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
  public canAddReview :Boolean = false;

  public _urlcommunity = '';
  public _urlParamas = '';

  constructor(
    public navCtrl: NavController,
    public modalCtnl: ModalController,
    params: NavParams,
    public http: Http,
    public httpService: HttpService,
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
    this.http.get(url).subscribe(data => {
      this.products = data.json();
    });
  }

  loadReviews() {
    let url = '/community/reviews/' + this.vendor.vendor_id;
    this.httpService.get(url, true).subscribe(data => {
      this.reviews = data.reviews;
      this.canAddReview = data.canAddReview;
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
    this.http.get(this._urlcommunity +'?offset='+this.start+this._urlParamas).subscribe(data=>{
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
  getReviewIcons(rat) {
    let icons = [];
    for (let i = 1; i <= rat; i++) {
			icons.push(i);
    }
    console.log(icons);
    return icons;
  }

  openReviewModal() {
    let modal = this.modalCtnl.create(VendorReviewPage, { vendor: this.vendor });
    modal.present();
    modal.onDidDismiss(data => {
      if(data.reviewSubmitted) {
        this.canAddReview = false; 
      }else{
        this.canAddReview = true; 
      }
    });
  }
}
