import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { GlobalService } from '../../../providers/global.service';

@Component({
  selector: 'page-directory-view',
  templateUrl: 'directory-view.html'
})
export class DirectoryViewPage {

  public vendor: any;

  constructor(
    public navCtrl: NavController,
    params: NavParams,
    private _loadingCtrl: LoadingController,
    public _config: GlobalService,
  ) {
    this.vendor = params.get('model');
  }
}
