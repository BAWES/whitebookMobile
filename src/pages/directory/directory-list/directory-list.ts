import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

import { GlobalService } from '../../../providers/global.service';

import { DirectoryViewPage } from '../directory-view/directory-view';

@Component({
  selector: 'directory-list',
  templateUrl: 'directory-list.html'
})

export class DirectoryListPage {
  
  public _urlDirectory: string;
  public directory : any = [];
  public keys: any = [];

  constructor(
    public navCtrl: NavController,
    private _params: NavParams,
    public httpService: Http,
    public _config: GlobalService
  ) {
    this._urlDirectory = this._config.apiBaseUrl + '/directory';
  }

  ionViewDidLoad() {
    this.loadDirectory();
  }

  /**
   * method to load direcoty
   */
  loadDirectory() {
    this.httpService.get(this._urlDirectory).subscribe(jsonResponse => {
      let result = jsonResponse.json();
      this.directory = this.generateArray(result.directory);
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
    this.navCtrl.push(DirectoryViewPage, {
      'model': model
    });
  }
}
