import { Injectable } from '@angular/core';

@Injectable()
export class Global {
  public categoryApiUrl = 'http://api.thewhitebook.local/v1/category';
  public productApiUrl = 'http://api.thewhitebook.local/v1/product';
  public _ApiUrl = 'http://api.thewhitebook.local/v1';

  public s3 = 'https://thewhitebook.s3.amazonaws.com';
  public images_210 = this.s3 + '/vendor_item_images_210';
  public images_530 = this.s3 + '/vendor_item_images_530';
  public images_1000 = this.s3 + '/vendor_item_images_1000';
}
