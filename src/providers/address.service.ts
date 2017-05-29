import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { Authentication } from '../providers/auth.service';

@Injectable()
export class AddressService {
  
  public _urlAddrress:string = '/address';
  
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

  listAll() {
    return this.httpService.get(this._urlAddrress + '/all');  
  }

  /**
   * Add addresses
   */
  add(params: any) {
    return this.httpService.post(this._urlAddrress, params);
  }
}