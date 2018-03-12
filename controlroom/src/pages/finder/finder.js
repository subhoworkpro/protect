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
import { Vibration } from 'ionic-native';
import { MapService } from '../../providers/map/map.service';
import { LoadingController, AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { SearchPage } from '../search/search';
import { ConfirmationPage } from '../confirmation/confirmation';
import { BasePage } from '../base-page';
var FinderPage = (function (_super) {
    __extends(FinderPage, _super);
    function FinderPage(platform, nav, geocoderService, mapService, modalCtrl, loadingCtrl, alertCtrl) {
        var _this = _super.call(this, alertCtrl) || this;
        _this.platform = platform;
        _this.nav = nav;
        _this.geocoderService = geocoderService;
        _this.mapService = mapService;
        _this.modalCtrl = modalCtrl;
        _this.loadingCtrl = loadingCtrl;
        _this.alertCtrl = alertCtrl;
        _this.localized = false;
        var alert = _this.alertCtrl.create({
            title: 'Emergency!',
            subTitle: "Your case has been registered with LalBazaar Control Room.",
            buttons: ['OK']
        });
        alert.present();
        return _this;
    }
    /***
     * This event is fired when map has fully loaded
     */
    FinderPage.prototype.onMapReady = function () {
        var _this = this;
        // I must wait platform.ready() to use plugins ( in this case Geolocation plugin ).
        return this.platform.ready().then(function () {
            return _this.locate().then(function () {
                var mapElement = _this.mapService.mapElement;
                if (mapElement) {
                    mapElement.classList.add('show-map');
                    _this.mapService.resizeMap();
                }
            });
        });
    };
    /***
     * This event is fired when the map becomes idle after panning or zooming.
     */
    FinderPage.prototype.onMapIdle = function () {
        var _this = this;
        if (!this.localized)
            return;
        var position = new google.maps.LatLng(22.5720024, 88.3514815);
        this.geocoderService.addressForlatLng(position.lat(), position.lng())
            .subscribe(function (address) {
            var res = address.split(",");
            var content = "<div class=\"address-police\">" + res[1] + "</div>";
            _this.mapService.createInfoWindow(content, position);
        }, function (error) {
            _this.displayErrorAlert();
            console.error(error);
        });
    };
    /***
     * This event is fired when the user starts dragging the map.
     */
    FinderPage.prototype.onDragStart = function () {
        this.mapService.closeInfoWindow();
    };
    FinderPage.prototype.openModal = function () {
        var searchModal = this.modalCtrl.create(SearchPage);
        searchModal.present();
    };
    FinderPage.prototype.goToConfirmation = function () {
        this.nav.push(ConfirmationPage);
    };
    /**
     * Get the current position
     */
    FinderPage.prototype.locate = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        loader.present();
        return this.mapService.setPosition(14).then(function () {
            _this.localized = true;
            // Vibrate the device for a second
            Vibration.vibrate(1000);
        }).catch(function (error) {
            _this.alertNoGps();
            console.warn(error);
        }).then(function () {
            // TODO why dismiss not working without setTimeout ?
            setTimeout(function () {
                loader.dismiss();
            }, 1000);
        });
    };
    FinderPage.prototype.alertNoGps = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Life line',
            subTitle: 'Gps and network locations are unavailable. Click OK to retry',
            enableBackdropDismiss: false,
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        setTimeout(function () { return _this.locate(); }, 1500);
                    }
                }],
        });
        alert.present();
    };
    return FinderPage;
}(BasePage));
FinderPage = __decorate([
    Component({
        templateUrl: 'finder.tpl.html'
    }),
    __metadata("design:paramtypes", [Platform,
        NavController,
        GeocoderService,
        MapService,
        ModalController,
        LoadingController,
        AlertController])
], FinderPage);
export { FinderPage };
//# sourceMappingURL=finder.js.map