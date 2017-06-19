import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, ViewController } from 'ionic-angular';
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
  public filterDeliveryDate: any;
  public filterDeliveryTime: any;
  public filterDeliveryArea:number = 0;
  // public filterAvailableForSale:boolean = false;
  // public filterCategory:number = 0;
  public filterPrice:any = {lower: 0, upper: 0};
  public filterTheme:any = '';
  public filterVendors:any = '';

  public timeslots: string[] = ['12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM', '2:30 AM'
    , '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM', '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM'
    , '7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'
    , '11:00 AM', '11:30 AM', '12:00 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'
    , '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM'
    , '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
    , '11:00 PM', '11:30 PM'];

  constructor(
    public viewCtrl:ViewController,
    public httpService: Http,
    public _config: GlobalService,
    private _params : NavParams,
    ) {
    this._urlProductArea = this._config.apiBaseUrl + '/product/area';
    this._urlCategory = this._config.apiBaseUrl + "/category";
    this._urlThemes = this._config.apiBaseUrl + "/product/theme";
    this._urlVendors = this._config.apiBaseUrl + "/product/vendors";
    this._urlPriceRange = this._config.apiBaseUrl + "/product/price-range";

    this.filterDeliveryArea = this._params.get('requestedLocation');
    this.filterDeliveryDate = this._params.get('requestedDeliverDate');
    this.filterDeliveryTime = this._params.get('requestedDeliverTime');

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
      'filterDeliveryTime':this.filterDeliveryTime,
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
