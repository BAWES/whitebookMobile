import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from '../../../providers/global.service';

import { PackageDetailPage } from '../../../pages/packages/package-detail/package-detail';

@Component({
  selector: 'page-package-list',
  templateUrl: 'package-list.html'
})
export class PackageListPage {
  
  public _urlPackage = '';
  public package:any;
  public start:number = 0;

  constructor(
    public navCtrl: NavController,
    public httpService: Http,
    public _config: GlobalService,
    public translateService: TranslateService
  ) {
    this._urlPackage = this._config.apiBaseUrl + '/package';
  }

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
          this.package = data.json();
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
        items = data.json();
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
