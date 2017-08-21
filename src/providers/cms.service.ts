import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CmsService {

  constructor(private httpService : HttpService) {     
  } 
    
  /**
   * Load page detail 
   * @param slug 
   */
  load(slug: string) {
      let url = '/cms/' + slug;
      return this.httpService.get(url);
  }
}
