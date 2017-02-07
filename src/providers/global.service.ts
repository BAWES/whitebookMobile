import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
/*
 * Handles all Environment-based config
 */
@Injectable()
export class GlobalService {
  
  // Endpoint Urls
  public productApiUrl:string; // this need to remove
  public _ApiUrl:string;

  public s3 = 'https://thewhitebook.s3.amazonaws.com';
  public images_210 = this.s3 + '/vendor_item_images_210';
  public images_530 = this.s3 + '/vendor_item_images_530';
  public images_1000 = this.s3 + '/vendor_item_images_1000';

  // InAppBrowser Settings
  public browserTarget: string;
  public browserOptions: string;
  public browserOptionsWithCache: string;

  constructor(public platform: Platform) {
    // Initiate dev environment on computer while
    // running the production on mobile
    //platform.ready().then(() => {
      if (platform.is('cordova')) {
        this.initProdEnvironment();
      } else {
        this.initDevEnvironment();
      }
    //});
  }

  /**
   * Initialize the Dev Environment
   * @param {string} [platform]
   */
  initDevEnvironment(platform?: string){
    this._ApiUrl = 'http://api.thewhitebook.local/v1';
    this.productApiUrl = this._ApiUrl+'/product'; // need to remove
    this.setupDeviceSpecificConfigs();
  }

  /**
   * Initialize the Production Environment
   * @param {string} [platform]
   */
  initProdEnvironment(platform?: string){
    this._ApiUrl = "https://api.plugn.io/v1";

    this.setupDeviceSpecificConfigs();
  }

  /**
   * Setup Device Specific Configs
   */
  setupDeviceSpecificConfigs(){
    // Generic Configs
    this.browserTarget = "_blank";
    this.browserOptions = "location=no";
    this.browserOptionsWithCache = "location=no";

    // iOS Specific Configs
    if(this.platform.is("ios")){
      this.browserTarget = "_blank";
      this.browserOptions = "location=no,clearcache=yes,clearsessioncache=yes,closebuttoncaption=cancel";
      this.browserOptionsWithCache = "location=no,clearcache=no,clearsessioncache=no,closebuttoncaption=cancel";
    }
    // Android Specific Configs
    if(this.platform.is("android")){
      this.browserTarget = "_blank";
      this.browserOptions = "location=yes,zoom=no,clearcache=yes,clearsessioncache=yes";
      this.browserOptionsWithCache = "location=yes,zoom=no,clearcache=no,clearsessioncache=no";
    }
    if(this.platform.is("android")){
      this.browserTarget = "_blank";
      this.browserOptions = "location=yes,zoom=no,clearcache=yes,clearsessioncache=yes";
      this.browserOptionsWithCache = "location=yes,zoom=no,clearcache=no,clearsessioncache=no";
    }
    if(this.platform.is("core")){
      this.browserTarget = "_system";
    }
  }

  /*
  * Api url for anil system environment   
  */
  initAnil() {
    this._ApiUrl = 'http://api.thewhitebook.local/v1';
    console.log('Anil Environment Settings');
  }

  /*
  * Api url for Khalid system environment   
  */
  initKhalid() {
    this._ApiUrl = "http://localhost/~BAWES/plugn/api/web/v1";
  }
}