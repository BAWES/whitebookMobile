import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Authentication } from '../providers/auth.service';

@Injectable()
export class AddressService {
  
  public _urlAddrress: string = '/address';
  public _urlcheckout: string = '/checkout';

  constructor(
    private httpService : HttpService,
    public authService: Authentication
  ){
  } 

  /**
   * List addresses
   */
  list() {
    return this.httpService.get(this._urlAddrress);
  }

  /**
   * Get location detail 
   */
  location($id) {
    return this.httpService.get(this._urlAddrress + '/location/' + $id);
  }

  listAll(area_id: any) {
    return this.httpService.get(this._urlAddrress + '/all?area_id=' + area_id);  
  }

  /**
   * Add addresses
   */
  add(params: any) {
    return this.httpService.post(this._urlAddrress, params);
  }

  addGuestAddress(params: any) {
    return this.httpService.post(this._urlcheckout + '/save-guest-address', params);
  }
} 