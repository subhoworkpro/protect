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
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { MapService } from '../../providers/map/map.service';
import { BasePage } from '../base-page';
import { AboutPage } from '../about/about';
import { AngularFire } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
var SearchPage = (function (_super) {
    __extends(SearchPage, _super);
    function SearchPage(afd, af, navCtrl, mapService, zone, alertCtrl, viewCtrl) {
        var _this = _super.call(this, alertCtrl) || this;
        _this.afd = afd;
        _this.af = af;
        _this.navCtrl = navCtrl;
        _this.mapService = mapService;
        _this.zone = zone;
        _this.alertCtrl = alertCtrl;
        _this.viewCtrl = viewCtrl;
        _this.nearbyPlaces = [];
        _this.addressElement = null;
        _this.firestore = firebase.database().ref('/pushtokens');
        _this.firemsg = firebase.database().ref('/messages');
        _this.fireauth = firebase.auth();
        _this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then(function (res) {
            console.log("logged in");
        });
        return _this;
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        // this.initAutocomplete();
        this.loadNearbyPlaces();
    };
    SearchPage.prototype.dismiss = function (location) {
        if (location) {
            this.mapService.mapCenter = location;
        }
        if (this.addressElement) {
            this.addressElement.value = '';
        }
        this.viewCtrl.dismiss();
    };
    SearchPage.prototype.tokensetup = function () {
        var promise = new Promise(function (resolve, reject) {
            FCMPlugin.getToken(function (token) {
                resolve(token);
            }, function (err) {
                reject(err);
            });
        });
        return promise;
    };
    SearchPage.prototype.storetoken = function (t) {
        this.afd.list(this.firestore).push({
            uid: firebase.auth().currentUser.uid,
            devtoken: t
        }).then(function () {
            console.log('Token stored');
        }).catch(function () {
            console.log('Token not stored');
        });
        this.afd.list(this.firemsg).push({
            messageto: 'officer',
            sendername: 'victim',
            message: 'Control Room: Your case has been registered with Lal Bazar.'
        }).then(function () {
            console.log('Message stored');
        }).catch(function () {
            console.log('Message not stored');
        });
        this.afd.list(this.firemsg).push({
            messageto: 'officer',
            sendername: 'officer',
            message: 'Control Room: A case has been assigned to you. Please look into it Asap.'
        }).then(function () {
            console.log('Message stored');
        }).catch(function () {
            console.log('Message not stored');
        });
    };
    /***
     * Place item has been selected
     */
    SearchPage.prototype.selectPlace = function (place) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Officer Assignment',
            message: 'Do you want to proceed with the assignment?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Ignore this case');
                    }
                },
                {
                    text: 'Assign',
                    handler: function () {
                        console.log('Assign on this case');
                        _this.tokensetup().then(function (token) {
                            _this.storetoken(token);
                            _this.navCtrl.push(AboutPage);
                        });
                    }
                }
            ]
        });
        alert.present();
        // this.dismiss(place.geometry.location);
    };
    SearchPage.prototype.initAutocomplete = function () {
        var _this = this;
        // reference : https://github.com/driftyco/ionic/issues/7223
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.mapService.createAutocomplete(this.addressElement).subscribe(function (location) {
            _this.dismiss(location);
        }, function (error) {
            _this.displayErrorAlert();
            console.error(error);
        });
    };
    SearchPage.prototype.loadNearbyPlaces = function () {
        this.nearbyPlaces = [
            {
                distance: "179.24",
                name: "Pravas Sen",
                vicinity: "98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
                icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
            },
            {
                distance: "279.24",
                name: "Pravas Sen",
                vicinity: "98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
                icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
            },
            {
                distance: "379.24",
                name: "Pravas Sen",
                vicinity: "98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
                icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
            },
            {
                distance: "479.24",
                name: "Pravas Sen",
                vicinity: "98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
                icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
            },
            {
                distance: "579.24",
                name: "Pravas Sen",
                vicinity: "98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
                icon: "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
            }
        ];
        // this.mapService.loadNearbyPlaces().subscribe((_nearbyPlaces) => {
        //   // force NgZone to detect changes
        //   this.zone.run(() => {
        //     this.nearbyPlaces.push.apply(this.nearbyPlaces, _nearbyPlaces);
        //   });
        // }, (error) => {
        //   this.displayErrorAlert();
        //   console.error(error);
        // });
    };
    return SearchPage;
}(BasePage));
__decorate([
    ViewChild('searchbar', { read: ElementRef }),
    __metadata("design:type", ElementRef)
], SearchPage.prototype, "searchbar", void 0);
SearchPage = __decorate([
    Component({
        templateUrl: 'search.tpl.html'
    }),
    __metadata("design:paramtypes", [AngularFireDatabase,
        AngularFire,
        NavController,
        MapService,
        NgZone,
        AlertController,
        ViewController])
], SearchPage);
export { SearchPage };
//# sourceMappingURL=search.js.map