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

  public today:any;
  public todayStr:any;
  public areaList:any;
  public categoryList:any;
  public themeList:any;
  public vendorList:any;
  
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
    public _config: GlobalService
    ) {
    this._urlProductArea = this._config._ApiUrl + '/product/area';
    this._urlCategory = this._config._ApiUrl + "/category";
    this._urlThemes = this._config._ApiUrl + "/product/theme";
    this._urlVendors = this._config._ApiUrl + "/product/vendors";
  }

  ionViewDidLoad() {
      this.today = new Date();
      this.today.setHours(0,0,0);
      this.todayStr  = this.today.toISOString().substring(0,10);
      console.log(this.todayStr);
      this.filterPrice = {lower: 1, upper: 121};
      this.filterDeliveryDate= this.todayStr;

      this.loadProductArea();
      this.loadCategoryList();
      this.loadThemeList();
      this.loadVendorList();
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
