import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';

@Component({
  selector: 'page-cms',
  templateUrl: 'cms.html',
})
export class Cms {

  public pageID : number = 0;
  public detail : any;

  constructor(
    public navParams: NavParams,    
    public httpService : HttpService
    ) {
    this.pageID =  this.navParams.get('id');
  }

  ionViewDidLoad() {
    if (this.pageID) {
        this.pageDetail(this.pageID);
    }
  }

  pageDetail(id){
    this.httpService.get('/cms/' + id).subscribe(data => {
      this.detail = data.json();
    })
  }
}
