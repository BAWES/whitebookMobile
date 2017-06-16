import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';

// Custom
import { EnvConfig } from '../app/environments/environments.token';

/*
 * Handles all Environment-based config
 */
@Injectable()
export class GlobalService {

  // Endpoint Urls
  public apiBaseUrl :string;

  public s3 = 'https://thewhitebook.s3.amazonaws.com';
  public images_210 = this.s3 + '/vendor_item_images_210';
  public images_530 = this.s3 + '/vendor_item_images_530';
  public images_1000 = this.s3 + '/vendor_item_images_1000';
  public vendor_logo = this.s3 + '/vendor_logo';
  public menu_item = this.s3 + "/vendor_menu_item";
  public menu_item_thumbnail = this.s3 + "/vendor_menu_item/thumbnail";

  // InAppBrowser Settings
  public browserTarget: string;
  public browserOptions: string;
  public browserOptionsWithCache: string;

  constructor(public platform: Platform, @Inject(EnvConfig) public envConfig) {
      console.log("Loaded Environment: " + this.envConfig.environmentName);

      // Set base API endpoint based on env config
      this.apiBaseUrl = this.envConfig.apiEndpoint;

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
    if(this.platform.is("core")){
      this.browserTarget = "_system";
    }
  }

}
