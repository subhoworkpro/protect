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
import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { MapService } from '../../providers/map/map.service';
var MapComponent = (function () {
    function MapComponent(mapService) {
        this.mapService = mapService;
        this.onMapReady = new EventEmitter();
        this.onMapIdle = new EventEmitter();
        this.onCenterChanged = new EventEmitter();
        this.onDragStart = new EventEmitter();
        this.map = null;
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var mapElem = this.mapCanvas.nativeElement;
        return this.mapService.createMap(mapElem).then(function (map) {
            _this.map = map;
            _this.bindMapEvents(mapElem);
        });
    };
    MapComponent.prototype.bindMapEvents = function (mapEl) {
        var _this = this;
        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener(mapEl, 'mousedown', function (e) {
            e.preventDefault();
        });
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            _this.onMapReady.emit({
                value: _this.map
            });
        });
        google.maps.event.addListenerOnce(this.map, 'center_changed', function () {
            _this.onCenterChanged.emit({
                value: _this.map
            });
        });
        google.maps.event.addListener(this.map, 'idle', function () {
            _this.onMapIdle.emit({
                value: _this.map
            });
        });
        google.maps.event.addListener(this.map, 'dragstart', function () {
            _this.onDragStart.emit({
                value: _this.map
            });
        });
    };
    return MapComponent;
}());
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapComponent.prototype, "onMapReady", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapComponent.prototype, "onMapIdle", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapComponent.prototype, "onCenterChanged", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], MapComponent.prototype, "onDragStart", void 0);
__decorate([
    ViewChild('map'),
    __metadata("design:type", Object)
], MapComponent.prototype, "mapCanvas", void 0);
MapComponent = __decorate([
    Component({
        selector: 'it-map',
        template: "<div #map id=\"gmaps\" data-tap-disabled=\"true\"></div>"
    }),
    __metadata("design:paramtypes", [MapService])
], MapComponent);
export { MapComponent };
//# sourceMappingURL=map.js.map