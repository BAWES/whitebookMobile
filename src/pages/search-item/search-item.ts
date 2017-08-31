import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
// Pages
import { ProductPage } from '../product/product';
// Services 
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../providers/global.service';
import { ProductService } from '../../providers/product.service';

@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html'
})

export class SearchItemPage {

  public items: any;
  public searching: any = false;

  private query: Observable<string> = new Observable;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public httpRequest: Http,
    public _config: GlobalService,
    public translateService: TranslateService,
    public productService: ProductService
  ) { 
    /*this.query.subscribe(function(value) {
      this.loadItems(value);  
    });*/
  }

  ionViewDidLoad() {
    this.loadItems('All');
  }

  /**
   * Get initial set of items
   * @param {string} [searchText='All'] 
   * @memberof SearchItemPage
   */
  loadItems(searchText:string = 'All') {
    this.productService.search(searchText).subscribe(result => {
      this.items = result;
      this.searching = false;
    });
  }

  /**
   * Load the items
   * @param {*} ev 
   * @memberof SearchItemPage
   */
  onSearchInput(ev: any) {
    this.searching = true;
    
    // Load new set of items based on user input 
    this.items = [];
    this.loadItems(ev.value);
  }

  /**
   * Dismiss the current page
   * @memberof SearchItemPage
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /*
  * Method open product detail page 
  * by sending product id
  */
  productDetail(id) {
    this.navCtrl.push(ProductPage,{productId:id})
  }
}
