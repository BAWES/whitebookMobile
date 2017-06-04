import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';

import { GlobalService } from '../../../providers/global.service';

import { ProductPage } from '../../product/product';

@Component({
  selector: 'page-package-detail',
  templateUrl: 'package-detail.html'
})

export class PackageDetailPage {
  
  public _urlPackage = '';

  public id:any
  public detail:any;
  public items:any;
  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public httpService: Http,
    public _config: GlobalService
  ) {
    this._urlPackage = this._config.apiBaseUrl + '/package/';
    this.id = this._params.get('id');
  }

  ionViewDidLoad() {
    this.loadDetail(this.id);
  }

  loadDetail(id) {
    this.httpService.get(this._urlPackage+id).subscribe(
      jsonResponse => {
        let data = jsonResponse.json();
        this.detail = data.package; 
        this.items = data.products; 
        //console.log(this.items);
      }
    )
  }

  detailItem(id) {
    this.navCtrl.push(ProductPage,{productId:id});
  }
}
