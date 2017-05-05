import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HttpService } from '../../../providers/http.service';
import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'page-directory-view',
  templateUrl: 'directory-view.html'
})
export class DirectoryViewPage {

  public vendor: any = [];
  public products : any = [];
  public start:number = 0;
  public productView :string;

  public _urlDirectory = '/directory/view';
  public _urlParamas = '';

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    private _loadingCtrl: LoadingController,
    public _config: GlobalService,
    public httpService: HttpService,
  ) {
    this.vendor = params.get('model');
    this.productView = 'grid-view';
    this._urlParamas = '&vendor_id=' + this.vendor.vendor_id;
    this.loadProducts();
  }
  
  /**
   * Load product listing
   */
  loadProducts() {
    this.httpService.get(this._urlDirectory+'?offset=0'+this._urlParamas)
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
    this.httpService.get(this._urlDirectory +'?offset='+this.start+this._urlParamas).subscribe(data=>{
        items = data;
        for(let item of items) {
          this.products.push(item);
        }
      console.log('Begin async operation');
      infiniteScroll.complete();
    })
  }
}
