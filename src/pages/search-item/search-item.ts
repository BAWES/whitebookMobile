import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController,ViewController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

import { GlobalService } from '../../providers/global.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html'
})

export class SearchItemPage {

  public _searchUrl:string = '';
  public items: any;
  public searching: any = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public httpRequest: Http,
    public _config: GlobalService,
    public translateService: TranslateService
  ) {
    this._searchUrl = this._config.apiBaseUrl + '/search?q=';
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
    this.httpRequest
      .get(this._searchUrl + searchText + '&offset=0')
      .subscribe((data)=> {
          this.items = data.json();
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
    this.loadItems(ev.target.value);
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
