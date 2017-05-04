import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';
import { GlobalService } from '../../providers/global.service';
import { Authentication } from '../../providers/auth.service';

@Component({
  selector: 'page-cms',
  templateUrl: 'cms.html',
})
export class Cms {

  public pageID : number = 0;
  public _urlCart = '/cms';
  public detail : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    
    public _http : HttpService,
    public _config:GlobalService,
    public _auth: Authentication
    ) {
    this.pageID =  this.navParams.get('id');
  }

  ionViewDidLoad() {
    if (this.pageID) {
        this.pageDetail(this.pageID);
    }
  }

  pageDetail(id){
    this._http.get(this._urlCart+'/'+id).subscribe(data => {
      this.detail = data;
      console.log(this.detail);
    })
  }
}
