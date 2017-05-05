import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';

import { HttpService } from '../../../providers/http.service';

import { DirectoryViewPage } from '../directory-view/directory-view';

@Component({
  selector: 'directory-list',
  templateUrl: 'directory-list.html'
})

export class DirectoryListPage {
  
  public _urlDirectory = '/directory';
  public directory : any = [];
  public keys: any = [];

  constructor(
    public navCtrl: NavController,
    private _params: NavParams,
    public httpService: HttpService,
  ) {
  }

  ionViewDidLoad() {
    this.loadDirectory();
  }

  /**
   * method to load direcoty
   */
  loadDirectory() {
    this.httpService.get(this._urlDirectory).subscribe(result => {
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
