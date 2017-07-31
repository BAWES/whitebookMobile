import { Injectable } from '@angular/core';
//Services 
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../http.service';

@Injectable()
export class WishlistService {

    public _urlWishlist = '/wishlist';

    constructor(
        public translateService: TranslateService,
        private httpService : HttpService
    ) { } 

    list(offset: number, category_id: number) {        
      let url = this._urlWishlist +'?offset=' + offset + '&category_id=' + category_id + '&language=' + this.translateService.currentLang;
      return this.httpService.get(url, true);
    }

    /**
     * Check if item available in wishlist 
     * @param item_id 
     */
    getStatus(item_id) {
        let url = this._urlWishlist + '/exist' +'?product_id=' + item_id;
        return this.httpService.get(url, true);
    }

    /**
     * Add item to wishlist 
     * @param item_id 
     */
    add(item_id: number) {
        let param = {
          'item_id' : item_id
        }
        return this.httpService.post(this._urlWishlist, param, true);
    }

    /**
     * Remove item from wishlist 
     */
    delete(wishlist_id: number) {
        let url = this._urlWishlist + '?wishlist_id=' + wishlist_id + '&language=' + this.translateService.currentLang;
        return this.httpService.delete(url, true);
    } 
}
