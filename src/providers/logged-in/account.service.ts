import { Injectable } from '@angular/core';
//Services 
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from '../http.service';

@Injectable()
export class AccountService {

    public _urlProfileUrl = '/account?language=' + this.translateService.currentLang;

    constructor(
        private httpService : HttpService,
        public translateService: TranslateService
    ){ } 

    detail() {
        return this.httpService.get(this._urlProfileUrl, true);
    }

    update(params: any) {        
        return this.httpService.patch(this._urlProfileUrl, params, true);
    }
}