import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class VendorService {

  constructor(
    private httpService : HttpService,
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
    
    const url = '/account/vendor-request';

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
