import { Injectable } from '@angular/core';
//Services 
import { HttpService } from '../http.service';

@Injectable()
export class WishlistService {

    public _urlWishlist = '/wishlist';

    constructor(private httpService : HttpService) {     
    } 

    /**
     * Check if item available in wishlist 
     * @param item_id 
     */
    getStatus(item_id) {
        let url = this._urlWishlist + '/exist' +'?product_id=' + item_id;
        return this.httpService.get(url);
    }

    /**
     * Add item to wishlist 
     * @param item_id 
     */
    add(item_id: number) {
        let param = {
          'item_id' : item_id
        }
        return this.httpService.post(this._urlWishlist, param);
    }

    /**
     * Remove item from wishlist 
     */
    delete(wishlist_id: number) {
        let url = this._urlWishlist + '?wishlist_id=' + wishlist_id;
        return this.httpService.delete(url);
    } 
}
