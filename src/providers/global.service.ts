import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

// Custom
import { EnvConfig } from '../app/environments/environments.token';

/*
 * Handles all Environment-based config
 */
@Injectable()
export class GlobalService {

  // Endpoint Urls
  public apiBaseUrl: string;
  public frontend: string;

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
  
  public facebook = {
		apiUrl: 'https://graph.facebook.com/v2.3/',
		appId: '927897987270774',
		scope: ['email']
	};
	public google = {
		apiUrl: 'https://www.googleapis.com/oauth2/v3/',
    appId: '763967388698-khv64ob8aq5a04hv81q1ub1u6plcsuv7.apps.googleusercontent.com',
    //400671186930-m07eu77bm43tgr30p90k6b9e1qgsva4p.apps.googleusercontent.com
		scope: ['email']
  };
  
  constructor(
    public platform: Platform, 
    @Inject(EnvConfig) public envConfig,
    public translateService: TranslateService
  ) {
      console.log("Loaded Environment: " + this.envConfig.environmentName);

      // Set base API endpoint based on env config
      this.apiBaseUrl = this.envConfig.apiEndpoint;
      this.frontend = this.envConfig.frontend;

      this.setupDeviceSpecificConfigs();
  }

  translate(en, ar) {
    if(this.translateService.currentLang == 'ar' && ar) {
      return ar;
    }else{
      return en;
    }
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
