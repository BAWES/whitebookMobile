import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController } from 'ionic-angular';

import { GlobalService } from '../../../providers/global.service';
import { TranslateService } from '@ngx-translate/core';
import { CommunityViewPage } from '../community-view/community-view';

@Component({
  selector: 'community-list',
  templateUrl: 'community-list.html'
})

export class CommunityListPage {
  
  public _urlcommunity: string;
  public community : any = [];
  public keys: any = [];

  constructor(
    public navCtrl: NavController,
    public httpService: Http,
    public _config: GlobalService,
    public translateService: TranslateService
  ) {
    this._urlcommunity = this._config.apiBaseUrl + '/community?language=' + this.translateService.currentLang;
  }

  ionViewDidLoad() {
    this.loadcommunity();
  }

  /**
   * method to load direcoty
   */
  loadcommunity() {
    this.httpService.get(this._urlcommunity).subscribe(jsonResponse => {
      let result = jsonResponse.json();
      this.community = this.generateArray(result.community);
      this.keys = result.keys;
    });
  }

  generateArray(obj){
     return Object.keys(obj).map((key)=>{ 
       return obj[key];
     });
  }
  /**
   * When its selected
   */
  rowSelected(model) {
    // Load Detail Page
    this.navCtrl.push(CommunityViewPage, {
      'model': model
    });
  }
}
