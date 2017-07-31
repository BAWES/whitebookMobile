import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CmsService {

  constructor(private httpService : Http) {     
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
