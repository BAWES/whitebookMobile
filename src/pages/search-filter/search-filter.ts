import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';

@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilterPage {

  //Api urls
  public _urlProductArea = '/product/area';
  public _urlCategory: string = "/category";
  public _urlThemes: string = "/product/theme";
  public _urlVendors: string = "/product/vendors";

  public today:any;
  public todayStr:any;
  public areaList:any;
  public categoryList:any;
  public themeList:any;
  public vendorList:any;
  
  // filter variables
  public filterDeliveryDate:any;
  public filterDeliveryArea:number = 0;
  public filterAvailableForSale:any = false;
  public filterCategory:number = 0;
  public filterPrice:any = {lower: 0, upper: 0};
  public filterTheme:any = false;
  public filterVendors:any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl:ViewController,
    public httpService: HttpService,
    ) {}

  ionViewDidLoad() {
      this.today = new Date();
      this.today.setHours(0,0,0);
      this.todayStr  = this.today.toISOString().substring(0,10);
      this.filterPrice = {lower: 1, upper: 121};
      this.filterDeliveryDate= this.todayStr;

      this.loadProductArea();
      this.loadCategoryList();
      this.loadThemeList();
      this.loadVendorList();
  }

  dismiss() {
      this.viewCtrl.dismiss()
  }
  
  /**
   * method to load product area
   */
  loadProductArea() {
      this.httpService.get(this._urlProductArea).subscribe(areaList=>{this.areaList = areaList});
  }
  
  /*
  * load category list
  */
  loadCategoryList(){
    this.httpService.get(this._urlCategory,false).subscribe(cateries => this.categoryList = cateries);
  }
  
  /*
  * load theme list
  */
  loadThemeList(){
    this.httpService.get(this._urlThemes,false).subscribe(theme => this.themeList = theme);
  }
  
  /*
  * load vendor list
  */
  loadVendorList(){
    this.httpService.get(this._urlVendors,false).subscribe(vendor => this.vendorList = vendor);
  }

  /**
   * load filter products
   */
  loadFilterProducts() {
    console.log("filterDeliveryDate : "+this.filterDeliveryDate);
    console.log("filterDeliveryArea : "+this.filterDeliveryArea);
    console.log("filterAvailableForSale : "+this.filterAvailableForSale);
    console.log("filterCategory : "+this.filterCategory);
    console.log("filterPrice : "+this.filterPrice.lower);
    console.log("filterTheme : "+this.filterTheme);
    console.log("filterVendors : "+this.filterVendors);
  }
}
