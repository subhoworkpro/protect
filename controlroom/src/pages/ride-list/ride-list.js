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
import { AlertController } from 'ionic-angular';
import { RideService } from '../../providers/ride/ride.service';
import { BasePage } from '../base-page';
var RideListPage = (function (_super) {
    __extends(RideListPage, _super);
    function RideListPage(rideService, alertCtrl) {
        var _this = _super.call(this, alertCtrl) || this;
        _this.rideService = rideService;
        _this.alertCtrl = alertCtrl;
        _this.rides = [];
        return _this;
    }
    RideListPage.prototype.ionViewDidEnter = function () {
        this.rides = this.rideService.getRides();
    };
    return RideListPage;
}(BasePage));
RideListPage = __decorate([
    Component({
        templateUrl: 'ride-list.tpl.html'
    }),
    __metadata("design:paramtypes", [RideService,
        AlertController])
], RideListPage);
export { RideListPage };
//# sourceMappingURL=ride-list.js.map