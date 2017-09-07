import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
// Services 
import { CmsService } from '../../providers/cms.service';
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
    public translateService: TranslateService,
    public cmsService: CmsService
    ) {
    this.slug =  this.navParams.get('slug');
  }

  ionViewDidLoad() {
    this.pageDetail(this.slug);
  }

  pageDetail(slug) {
    this.cmsService.load(slug).subscribe(data => {
      this.detail = data;
    })
  }
}
