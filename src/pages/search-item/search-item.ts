import { Component } from '@angular/core';
import { NavController,ViewController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';

import { HttpService } from '../../providers/http.service';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-search-item',
  templateUrl: 'search-item.html'
})

export class SearchItemPage {

  public _searchUrl:string = '/search?q=';
  public items: any;
  public searching: any = false;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public httpRequest: HttpService
  ) {}

  ionViewDidLoad() {
    this.initializeItems('All');
  }

  initializeItems(searchText:string = 'All') {
    this.httpRequest.get(this._searchUrl + searchText + '&offset=0').subscribe(data=>
      this.items = data
    )
    this.searching = false;
  }

  getItems(ev: any) {
    this.searching = true;
    
    // Reset items back to all of the items
    this.initializeItems(ev.target.value);

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.item_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

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
