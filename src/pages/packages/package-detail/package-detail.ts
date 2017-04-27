import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpService } from '../../../providers/http.service';
import { GlobalService } from '../../../providers/global.service';


@Component({
  selector: 'page-package-detail',
  templateUrl: 'package-detail.html'
})
export class PackageDetailPage {
  
  public _urlPackage = '/package/';
  public id:any
  public detail:any;

  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public httpService: HttpService,
    public _config: GlobalService,
  ) {
    this.id = this._params.get('id');
  }

  ionViewDidLoad() {
    this.loadDetail(this.id);
  }

  loadDetail(id) {
    this.httpService.get(this._urlPackage+id).subscribe(
      data => {
        this.detail = data; 
      }
    )
  }
}
