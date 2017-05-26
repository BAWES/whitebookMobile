import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GlobalService } from '../../providers/global.service';

@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilterPage {

  //Api urls
  public _urlProductArea = '';
  public _urlCategory: string = "";
  public _urlThemes: string = "";
  public _urlVendors: string = "";
  public _urlPriceRange: string = '';

  public today:any;
  public todayStr:any;
  public areaList:any;
  public categoryList:any;
  public themeList:any;
  public vendorList:any;
  public minRange: number;
  public maxRange: number;

  // filter variables
  public filterDeliveryDate:any;
  public filterDeliveryArea:number = 0;
  // public filterAvailableForSale:boolean = false;
  // public filterCategory:number = 0;
  public filterPrice:any = {lower: 0, upper: 0};
  public filterTheme:any = '';
  public filterVendors:any = '';

  constructor(
    public viewCtrl:ViewController,
    public httpService: Http,
    public _config: GlobalService,
    private _params : NavParams,
    ) {
    this._urlProductArea = this._config._ApiUrl + '/product/area';
    this._urlCategory = this._config._ApiUrl + "/category";
    this._urlThemes = this._config._ApiUrl + "/product/theme";
    this._urlVendors = this._config._ApiUrl + "/product/vendors";
    this._urlPriceRange = this._config._ApiUrl + "/product/price-range";

    this.filterDeliveryArea = this._params.get('requestedLocation');
    this.filterDeliveryDate = this._params.get('requestedDeliverDate');

    if(this._params.get('requestedVendor'))
      this.filterVendors = this._params.get('requestedVendor').split(',');
    
    if(this._params.get('requestedTheme'))
      this.filterTheme = this._params.get('requestedTheme').split(',');     
  }

  ionViewDidLoad() {
      this.today = new Date();
      this.today.setHours(0,0,0);
      this.todayStr  = this.today.toISOString().substring(0,10);
      console.log(this.todayStr);
      
      if(!this.filterDeliveryDate)
        this.filterDeliveryDate = this.todayStr;

      this.loadProductArea();
      this.loadCategoryList();
      this.loadThemeList();
      this.loadVendorList();
      this.loadPriceRange();
  }

  dismiss() {
    let params = {
      'filterDeliveryDate':this.filterDeliveryDate,
      'filterDeliveryArea':this.filterDeliveryArea,
      // 'filterAvailableForSale':this.filterAvailableForSale,
      // 'filterCategory': this.filterCategory,
      'filterMinPrice':this.filterPrice.lower,
      'filterMaxPrice':this.filterPrice.upper,
      'filterTheme':this.filterTheme,
      'filterVendors':this.filterVendors
    }
      this.viewCtrl.dismiss(params);
  }
  
  loadPriceRange() {
      this.httpService.get(this._urlPriceRange).subscribe(data => {
        let result = data.json();
        this.minRange = result.minRange;
        this.maxRange = result.maxRange;

        //set price 
        
        let minPrice, maxPrice = 0;

        if(this._params.get('requestedMinPrice')){
          minPrice = this._params.get('requestedMinPrice');
        }else{
          minPrice = this.minRange;
        }

        if(this._params.get('requestedMaxPrice')){
          maxPrice = this._params.get('requestedMaxPrice');
        }else{
          maxPrice = this.maxRange;
        }

        this.filterPrice = {
          lower: minPrice, 
          upper: maxPrice
        }; 
      });
  }

  /**
   * method to load product area
   */
  loadProductArea() {
      this.httpService.get(this._urlProductArea).subscribe(areaList=>{
        this.areaList = areaList.json()
      });
  }
  
  /*
  * load category list
  */
  loadCategoryList(){
    this.httpService.get(this._urlCategory,false).subscribe(cateries => {
      this.categoryList = cateries.json()
    });
  }
  
  /*
  * load theme list
  */
  loadThemeList(){
    this.httpService.get(this._urlThemes,false).subscribe(theme => {
      this.themeList = theme.json()
    });
  }
  
  /*
  * load vendor list
  */
  loadVendorList(){
    this.httpService.get(this._urlVendors,false).subscribe(vendor => {
      this.vendorList = vendor.json()
    });
  }
}
