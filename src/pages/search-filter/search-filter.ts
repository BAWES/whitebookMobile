import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from '../../providers/http.service';

@Component({
  selector: 'page-search-filter',
  templateUrl: 'search-filter.html'
})
export class SearchFilterPage {

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl:ViewController,
    public httpService: HttpService,
    ) {
    this.today = new Date();
    this.today.setHours(0,0,0);
    this.todayStr  = this.today.toISOString().substring(0,10);
    this.loadProductArea();
    this.loadCategoryList();
    this.loadThemeList();
    this.loadVendorList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFilterPage');
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
}
