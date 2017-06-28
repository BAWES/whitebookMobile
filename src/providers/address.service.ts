import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TranslateService } from '@ngx-translate/core';

import { Authentication } from '../providers/auth.service';

@Injectable()
export class AddressService {
  
  public _urlAddrress: string = '/address';
  public _urlcheckout: string = '/checkout';

  constructor(
    private httpService : HttpService,
    public translateService: TranslateService,
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
    let url = this._urlAddrress + '/location/' + $id + '?language=' + this.translateService.currentLang;
    return this.httpService.get(url);
  }

  listAll(area_id: any) {
    let url = this._urlAddrress + '/all?area_id=' + area_id + '&language=' + this.translateService.currentLang;
    return this.httpService.get(url);  
  }

  /**
   * Add addresses
   */
  add(params: any) {
    let url = this._urlAddrress + '?language=' + this.translateService.currentLang;
    return this.httpService.post(url, params);
  }

  addGuestAddress(params: any) {
    let url = this._urlcheckout + '/save-guest-address' + '?language=' + this.translateService.currentLang;
    return this.httpService.post(url, params);
  }
} 