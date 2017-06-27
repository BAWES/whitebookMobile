import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-cms',
  templateUrl: 'cms.html',
})
export class Cms {

  public slug: string;
  public detail: any;

  constructor(
    public navParams: NavParams,    
    public httpService : HttpService,
    public translateService: TranslateService
    ) {
    this.slug =  this.navParams.get('slug');
  }

  ionViewDidLoad() {
    this.pageDetail(this.slug);
  }

  pageDetail(slug){
    this.httpService.get('/cms/' + slug).subscribe(data => {
      this.detail = data;
    })
  }
}
