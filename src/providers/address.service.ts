import { Injectable } from '@angular/core';
//Services 
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../providers/http.service';
import { Authentication } from '../providers/auth.service';

@Injectable()
export class AddressService {
  
  public _urlAddress: string = '/address';
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
  list(offset:number = 0) {    
      let url = this._urlAddress + '?offset=' + offset + '&language=' + this.translateService.currentLang;
      return this.httpService.get(url, true);
  }

  /**
   * Load address detail 
   * @param address_id 
   */
  detail(address_id) {
    let url = this._urlAddress + '/' + address_id;
    return this.httpService.get(url);
  }

  /**
   * Get location detail 
   */
  location($id) {
    let url = this._urlAddress + '/location/' + $id + '?language=' + this.translateService.currentLang;
    return this.httpService.get(url);
  }

  /**
   * Load all address for specific area 
   * @param area_id 
   */
  listAll(area_id: any) {
    let url = this._urlAddress + '/all?area_id=' + area_id + '&language=' + this.translateService.currentLang;
    return this.httpService.get(url, true);  
  }

  /**
   * Add addresses
   */
  add(params: any) {
    let url = this._urlAddress + '?language=' + this.translateService.currentLang;
    return this.httpService.post(url, params, true);
  }

  /**
   * Update addresses
   */
  update(params: any) {
    let url = this._urlAddress + '?language=' + this.translateService.currentLang;
    return this.httpService.post(url, params, true);
  }

  /**
   * Add guest customer's address
   * @param params 
   */
  addGuestAddress(params: any) {
    let url = this._urlcheckout + '/save-guest-address' + '?language=' + this.translateService.currentLang;
    return this.httpService.post(url, params);
  }

  /**
   * Load address types 
   */
  loadAdressTypes() {
    let url = this._urlAddress + '/type';
    return this.httpService.get(url);
  }
  
  /**
   * Load area list 
   */
  loadLocations() {
    let url = this._urlAddress + '/location';
    return this.httpService.get(url);
  }

  /**
   * Load questions for specific address type 
   * @param address_type_id 
   */
  loadQuestions(address_type_id) {
    let url = this._urlAddress + '/questions?address_type_id=' + address_type_id;
    return this.httpService.get(url);
  }    

  delete(id) {
    let url = this._urlAddress + '?address_id=' + id + '&language=' + this.translateService.currentLang;
    return this.httpService.delete(url, true);
  }
} 
