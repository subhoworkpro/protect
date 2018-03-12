/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
// Amount of time (in milliseconds) to pause between each trip to the
// Geocoding API, which places limits on frequency.
var QUERY_PAUSE = 500;
var GeocoderService = (function () {
    function GeocoderService() {
        this.geocoder = null;
    }
    /***
     * Convert coordinates to address
     * @param lat
     * @param lng
     * @returns {Observable}
     */
    GeocoderService.prototype.addressForlatLng = function (lat, lng) {
        if (!this.geocoder) {
            this.geocoder = new google.maps.Geocoder();
        }
        var latlng = new google.maps.LatLng(lat, lng);
        return this.geocode(latlng)
            .debounceTime(QUERY_PAUSE)
            .distinctUntilChanged()
            .map(function (res) { return res.formatted_address; })
            .retry(3);
    };
    GeocoderService.prototype.geocode = function (latlng) {
        var _this = this;
        return new Observable(function (sub) {
            _this.geocoder.geocode({ location: latlng }, function (result, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    sub.next(result[0]);
                    sub.complete();
                }
                else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
                    sub.error({
                        type: 'ZERO',
                        message: "Zero results for geocoding location: " + location
                    });
                }
                else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    sub.error({
                        type: 'OVER_QUERY_LIMIT',
                        message: "OVER_QUERY_LIMIT. location: " + location
                    });
                }
                else if (status === google.maps.GeocoderStatus.REQUEST_DENIED) {
                    sub.error({
                        type: 'DENIED',
                        message: "Request denied for geocoding location: " + location
                    });
                }
                else {
                    sub.error({
                        type: 'INVALID',
                        message: "Invalid request for geocoding: status: " + status + ", location: " + location
                    });
                }
            });
        });
    };
    return GeocoderService;
}());
GeocoderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], GeocoderService);
export { GeocoderService };
//# sourceMappingURL=geocoder.service.js.map