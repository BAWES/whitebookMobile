import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { HttpService } from '../../../providers/http.service';
import { GlobalService } from '../../../providers/global.service';

import { PackageDetailPage } from '../../../pages/packages/package-detail/package-detail';

@Component({
  selector: 'page-package-list',
  templateUrl: 'package-list.html'
})
export class PackageListPage {
  
  public _urlPackage = '/package';
  public package:any;
  public start:number = 0;

  constructor(
    public navCtrl: NavController,
    private _params : NavParams,
    public modalCtnl: ModalController,
    public httpService: HttpService,
    public _config: GlobalService,
  ) {}

  ionViewDidLoad() {
    this.loadPackages();
  }

  /**
   * Load Package listing
   */
  loadPackages() {
    this.httpService.get(this._urlPackage+'?offset=0')
      .subscribe(
        data => {
          this.package = data;
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
    this.httpService.get(this._urlPackage +'?offset='+this.start).subscribe(data=>{
        items = data;
        for(let item of items) {
          this.package.push(item);
        }
      console.log('Begin async operation');
      infiniteScroll.complete();
      console.log('Ebd async operation');
    })
  }

  detail(id) {
    this.navCtrl.push(PackageDetailPage,{id:id});
  }
}
