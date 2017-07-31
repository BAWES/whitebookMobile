import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class BookingService {

    public _urlBookingEndpoint: string = "/bookings";

    constructor(
        private httpService : HttpService,
        public translateService: TranslateService
    ) { } 
    
    /**
     * Load booking detail 
     * @param booking_token 
     */
    detail(booking_token: string) {
        let url = this._urlBookingEndpoint + '/' + booking_token + '?language=' + this.translateService.currentLang;
        return this.httpService.get(url);
    }

    /**
     * List bookings
     * @param offset 
     */
    list(offset: number) {
        let url = this._urlBookingEndpoint + '?offset=' + offset + '&language=' + this.translateService.currentLang;
        return this.httpService.get(url, true);
    }
}


    