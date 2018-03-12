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
import * as uuid from 'node-uuid';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { RideModel } from './ride.model';
var RideService = (function () {
    function RideService(events) {
        this.events = events;
        this._rides = [];
    }
    RideService.prototype.addRide = function (departure, destination) {
        var model = new RideModel(uuid.v4(), departure, destination);
        this._rides.push(model);
    };
    RideService.prototype.getRides = function () {
        return this._rides;
    };
    return RideService;
}());
RideService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Events])
], RideService);
export { RideService };
//# sourceMappingURL=ride.service.js.map