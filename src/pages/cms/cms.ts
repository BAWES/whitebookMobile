import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'page-cms',
  templateUrl: 'cms.html',
})
export class Cms {

  public pageID : number = 0;
  public detail : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,    
    public _http : Http,
    public _config: GlobalService
    ) {
    this.pageID =  this.navParams.get('id');
  }

  ionViewDidLoad() {
    if (this.pageID) {
        this.pageDetail(this.pageID);
    }
  }

  pageDetail(id){
    this._http.get(this._config._ApiUrl + '/cms/' + id).subscribe(data => {
      this.detail = data.json();
    })
  }
}
