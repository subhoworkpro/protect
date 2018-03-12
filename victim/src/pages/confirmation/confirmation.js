/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { RideService } from '../../providers/ride/ride.service';
import { BasePage } from '../base-page';
import { RideListPage } from '../ride-list/ride-list';
import { MapService } from '../../providers/map/map.service';
var ConfirmationPage = (function (_super) {
    __extends(ConfirmationPage, _super);
    function ConfirmationPage(nav, fb, rideService, mapService, geocoderService, alertCtrl) {
        var _this = _super.call(this, alertCtrl) || this;
        _this.nav = nav;
        _this.fb = fb;
        _this.rideService = rideService;
        _this.mapService = mapService;
        _this.geocoderService = geocoderService;
        _this.alertCtrl = alertCtrl;
        _this.departure = null;
        _this.destination = null;
        _this.form = _this.fb.group({
            departure: ['', [Validators.required]],
            destination: ['', [Validators.required]]
        });
        _this.position = _this.mapService.mapCenter;
        if (_this.position) {
            _this.geocoderService.addressForlatLng(_this.position.lat(), _this.position.lng())
                .subscribe(function (address) {
                _this.departure = address;
            }, function (error) {
                _this.displayErrorAlert();
                console.error(error);
            });
        }
        return _this;
    }
    ConfirmationPage.prototype.onConfirm = function (model, isValid) {
        var _this = this;
        if (!isValid) {
            this.displayErrorAlert();
            return;
        }
        var prompt = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Taxi will pick you up within 5 minutes. Do you want to confirm ?',
            buttons: [{
                    text: 'Cancel'
                }, {
                    text: 'Confirm',
                    handler: function () {
                        _this.rideService.addRide(model.departure, model.destination);
                        _this.nav.setRoot(RideListPage);
                    }
                }]
        });
        prompt.present();
    };
    return ConfirmationPage;
}(BasePage));
ConfirmationPage = __decorate([
    Component({
        templateUrl: 'confirmation.tpl.html'
    }),
    __metadata("design:paramtypes", [NavController,
        FormBuilder,
        RideService,
        MapService,
        GeocoderService,
        AlertController])
], ConfirmationPage);
export { ConfirmationPage };
//# sourceMappingURL=confirmation.js.map