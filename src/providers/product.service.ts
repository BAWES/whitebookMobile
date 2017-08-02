import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//Services 
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './http.service';

@Injectable()
export class ProductService {

    public _urlProduct = '/product'; 

    constructor(
        private http : Http, 
        private httpService : HttpService,
        private translateService: TranslateService
    ) { } 
    
    /**
     * Search products
     * @param searchText 
     * @param offset 
     */
    search(searchText: string, offset: number = 0) {
        let url = '/search?q=' + searchText + '&offset=0';
        return this.httpService.get(url);  
    }

    /**
     * List products
     * @param params 
     */
    list(params: string) {
        let url = this._urlProduct + '/list' + params;
        return this.httpService.get(url);  
    }

    /**
     * Load product detail 
     * @param product_id 
     */
    loadProductDetail(product_id: number) {
      let url = this._urlProduct + '/detail?language=' + this.translateService.currentLang + '&product_id=' + product_id;
      return this.httpService.get(url);
    }

    /**
     * Load Product Delivery areas 
     * @param vendor_id 
     */
    loadProductArea(vendor_id) {
        let url = this._urlProduct + '/area?language=' + this.translateService.currentLang + '&vendor_id=' + vendor_id;
        return this.httpService.get(url);
    }

    /**
     * Load available areas 
     */
    loadAreas() {
        let url = this._urlProduct + '/area';
        return this.httpService.get(url);
    }
         
    /**
     * Load item final price 
     * @param product_id
     * @param quantity 
     * @param menuItem  
     */
    loadFinalPrice(product_id, quantity, menuItem) {
        let params = {
            'item_id' : product_id,
            'quantity' : quantity,
            'menu_item' : menuItem
        }    
        let url = this._urlProduct + '/final-price?language=' + this.translateService.currentLang  
        return this.httpService.post(url, params);
    }
 
    /**
     * Load available delivery timeslot 
     * @param vendor_id 
     * @param event_date 
     * @param time 
     * @param current_date 
     */
    loadTimeSlot(vendor_id, event_date, time, current_date) {
        let url = this._urlProduct + '/time-slot?language=' + this.translateService.currentLang 
            + '&vendor_id=' + vendor_id + '&event_date=' + event_date + '&time=' + time 
            + '&current_date=' + current_date;    
        return this.httpService.get(url);
    }
    
    /**
     * Load max item quantity vendor can deliver   
     * @param product_id 
     * @param delivery_date 
     */
    productCapacity(product_id: number, delivery_date: string) {
        let url = this._urlProduct + '/capacity?language=' + this.translateService.currentLang 
            + '&product_id=' + product_id + '&deliver_date=' + delivery_date;
        return this.httpService.get(url);
    }    

    /**
     * Load price range to filter 
     */
    loadPriceRange() {
        let url = this._urlProduct + "/price-range";
        return this.httpService.get(url);
    }   

    /**
     * Load vendor list 
     */
    getVendorList() {
        let url = this._urlProduct + '/vendors';
        return this.httpService.get(url);
    }

    /**
     * Load theme list 
     */
    getThemeList() {
        let url = this._urlProduct + '/theme';
        return this.httpService.get(url);
    }
    
    /**
     * Load category list 
     */
    getCategoryList() {        
        let url = this._urlProduct + '/category?language=' + this.translateService.currentLang;
        return this.httpService.get(url);
    }
}
