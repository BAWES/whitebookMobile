import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalService } from '../providers/global.service';

@Injectable()
export class VendorService {

  constructor(
    private httpService : Http,
    public _config: GlobalService
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
    
    const url = this._config.apiBaseUrl + '/account/vendor-request';

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
