import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
//Services
import { GlobalService } from '../../providers/global.service';
import { ProductService } from '../../providers/product.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilterPage {

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
    public loadingCtrl: LoadingController,
    public viewCtrl:ViewController,
    public productService: ProductService,
    public _config: GlobalService,
    private _params : NavParams,
    public translateService: TranslateService
  ) {
    this.filterDeliveryArea = this._params.get('requestedLocation');
    this.filterDeliveryDate = this._params.get('requestedDeliverDate');
    this.filterDeliveryTime = this._params.get('requestedDeliverTime');

    if(this._params.get('requestedVendor'))
      this.filterVendors = this._params.get('requestedVendor').split(',');
    
    if(this._params.get('requestedTheme'))
      this.filterTheme = this._params.get('requestedTheme').split(',');     
  }

  ionViewDidLoad() {      
    //this.setDefaultDeliveryDate();
    this.loadData();
  }

  loadData() {    
    let loading = this.loadingCtrl.create();
    loading.present();
    this.productService.filterData().subscribe(result => {
      this.areaList = result.areas; 
      this.categoryList = result.categories;
      this.themeList = result.themes;
      this.vendorList = result.vendors;

      this.minRange = result.minRange;
      this.maxRange = result.maxRange;

      //set price 
        
      let minPrice, maxPrice = 0;

      if(this._params.get('requestedMinPrice')){
        minPrice = this._params.get('requestedMinPrice');
      } else {
        minPrice = this.minRange;
      }

      if(this._params.get('requestedMaxPrice')){
        maxPrice = this._params.get('requestedMaxPrice');
      } else {
        maxPrice = this.maxRange;
      }

      this.filterPrice = {
        lower: minPrice, 
        upper: maxPrice
      }; 

      loading.dismiss();
    });
  }

  setDefaultDeliveryDate() {
    this.today = new Date();
    this.today.setHours(0,0,0);
    this.todayStr = this.today.toISOString().substring(0,10);    
    this.filterDeliveryDate = this.todayStr;
  }

  reset() {
    this.filterDeliveryArea = null;    
    this.filterDeliveryDate = null;
    this.filterDeliveryTime = null;
    this.filterVendors = [];
    this.filterTheme = [];     
    this.filterPrice = {lower: this.minRange, upper: this.maxRange};     
  }

  dismiss() {
    let params = {
      'filterDeliveryDate':this.filterDeliveryDate,
      'filterDeliveryTime':this.filterDeliveryTime,
      'filterDeliveryArea':this.filterDeliveryArea,
      // 'filterAvailableForSale':this.filterAvailableForSale,
      // 'filterCategory': this.filterCategory,
      'filterMinPrice': this.filterPrice.lower != this.minRange ? this.filterPrice.lower : null,
      'filterMaxPrice':this.filterPrice.upper != this.maxRange ? this.filterPrice.upper : null,
      'filterTheme':this.filterTheme,
      'filterVendors':this.filterVendors
    }
      this.viewCtrl.dismiss(params);
  }
}
