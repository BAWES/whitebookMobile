import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalService } from '../providers/global.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class VendorService {

  constructor(
    private httpService : Http,
    public _config: GlobalService,
    public translateService: TranslateService
  ){
     
  } 
    
  vendorRequest(
    business: string,
    name: string,
    mobile: string, 
    email: string, 
    licence: string,
    description: string
    ){
    
    const url = this._config.apiBaseUrl + '/account/vendor-request?language=' + this.translateService.currentLang;

    return this.httpService.post(url, {
          'business': business,
          'name': name,
          'mobile': mobile,
          'email': email,
          'licence': licence,
          'description': description
      });
  }
}
