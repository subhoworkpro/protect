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
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MapConst } from './map.constants';
var MapService = (function () {
    function MapService() {
        this.map = null;
        this.infoWindow = null;
        this.markers = [];
        this.icons = {
            victim: {
                icon: 'assets/icon/victim.png'
            },
            police: {
                icon: 'assets/icon/police.png'
            }
        };
    }
    MapService.prototype.createMap = function (mapEl, opts) {
        var _this = this;
        if (opts === void 0) { opts = {
            lat: MapConst.DEFAULT_LAT,
            lon: MapConst.DEFAULT_LNG,
            zoom: MapConst.DEFAULT_ZOOM
        }; }
        return this.loadMap().then(function () {
            var myLatLng = new google.maps.LatLng(opts.lat, opts.lon);
            var styleArray = [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [
                        { visibility: 'off' }
                    ]
                }
            ];
            var mapOptions = {
                zoom: opts.zoom,
                minZoom: opts.zoom,
                center: myLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                scaleControl: false,
                styles: styleArray,
                zoomControl: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                }
            };
            _this.map = new google.maps.Map(mapEl, mapOptions);
            return _this.map;
        });
    };
    Object.defineProperty(MapService.prototype, "mapCenter", {
        /**
         * return the coordinates of the center of map
         * @returns {LatLng}
         */
        get: function () {
            return this.map.getCenter();
        },
        set: function (location) {
            this.map.setCenter(location);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapService.prototype, "mapElement", {
        /***
         * return map html element
         * @returns {Element}
         */
        get: function () {
            return this.map.getDiv();
        },
        enumerable: true,
        configurable: true
    });
    /***
     * create an infoWindow and display it in the map
     * @param content - the content to display inside the infoWindow
     * @param position
     */
    MapService.prototype.createInfoWindow = function (content, position) {
        var _this = this;
        this.closeInfoWindow();
        var opt = {
            content: content,
            position: position,
            pixelOffset: new google.maps.Size(0, -60),
            disableAutoPan: true,
            maxWidth: 150,
        };
        this.infoWindow = new google.maps.InfoWindow(opt);
        setTimeout(function () { return _this.infoWindow.open(_this.map); }, 100);
    };
    /***
     * close the current infoWindow
     */
    MapService.prototype.closeInfoWindow = function () {
        if (this.infoWindow) {
            this.infoWindow.close();
        }
    };
    /***
     * create Place Autocomplete
     * ref: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
     * @param addressEl
     * @returns {Observable}
     */
    MapService.prototype.createAutocomplete = function (addressEl) {
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        autocomplete.bindTo('bounds', this.map);
        return new Observable(function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    sub.next(place.geometry.location);
                    sub.complete();
                }
            });
        });
    };
    /***
     * set map position and the relative center and zoom
     * @returns {Promise<google.maps.LatLng>}
     */
    MapService.prototype.setPosition = function (zoom) {
        // return this.getCurrentPosition().then((coords: Coordinates) => {
        //   if (!coords) {
        //     console.warn('invalid coordinates: ', coords);
        //     return null;
        //   }
        //   const myLatLng = new google.maps.LatLng(coords.latitude, coords.longitude);
        //   this.map.setCenter(myLatLng);
        //   // this.map.setZoom(MapConst.MAX_ZOOM);
        //   this.addMarker(coords.latitude, coords.longitude,"victim");
        //   this.map.setZoom(15);
        //   return this.mapCenter;
        // });
        var _this = this;
        return this.getCurrentPosition().then(function (locations) {
            var myLatLng = new google.maps.LatLng(locations[0].latitude, locations[0].longitude);
            _this.map.setCenter(myLatLng);
            // this.map.setZoom(MapConst.MAX_ZOOM);
            _this.addMarker(locations[0].latitude, locations[0].longitude, "victim");
            // this.createInfoWindow("Victim",new google.maps.LatLng(locations[0].latitude,  locations[0].longitude));
            _this.addMarker(locations[1].latitude, locations[1].longitude, "police");
            // this.createInfoWindow("Police",new google.maps.LatLng(locations[1].latitude,  locations[1].longitude));
            _this.map.setZoom(zoom);
            return _this.mapCenter;
        });
    };
    MapService.prototype.addMarker = function (lat, lng, feature) {
        var latLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon: this.icons[feature].icon //Doesn't do anything
        });
        this.markers.push(marker);
    };
    /***
     * trigger map resize event
     */
    MapService.prototype.resizeMap = function () {
        if (this.map) {
            google.maps.event.trigger(this.map, 'resize');
        }
    };
    /***
     * google map place searches
     * @returns {Observable}
     */
    MapService.prototype.loadNearbyPlaces = function () {
        var position = this.mapCenter;
        var placesService = new google.maps.places.PlacesService(this.map);
        var request = {
            location: position,
            radius: 500
        };
        return new Observable(function (sub) {
            placesService.nearbySearch(request, function (results, status) {
                var _nearbyPlaces = [];
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        var distance = google.maps.geometry.spherical.computeDistanceBetween(position, place.geometry.location);
                        place.distance = distance.toFixed(2);
                        _nearbyPlaces.push(place);
                    }
                    sub.next(_nearbyPlaces);
                    sub.complete();
                }
                else {
                    sub.error({
                        message: "Invalid response status from nearbySearch : " + status
                    });
                }
            });
        });
    };
    /***
     * Load Google Map Api in async mode
     * @returns {Promise}
     */
    MapService.prototype.loadMap = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (window.google && window.google.maps) {
                resolve();
            }
            else {
                _this.loadGoogleMapApi().then(function () { return resolve(); }).catch(function (reason) {
                    reject(reason);
                });
            }
        });
    };
    /***
     * get the current location using Geolocation cordova plugin
     * @param maximumAge
     * @returns {Promise<Coordinates>}
     */
    MapService.prototype.getCurrentPosition = function (maximumAge) {
        if (maximumAge === void 0) { maximumAge = 60000; }
        var options = {
            timeout: 30000,
            enableHighAccuracy: true,
            maximumAge: maximumAge
        };
        // return Geolocation.getCurrentPosition(options).then((pos: Geoposition) => {
        //   return pos.coords;
        // });
        return this.getCoords().then(function (locations) {
            return locations;
        });
    };
    MapService.prototype.getCoords = function () {
        var locations = [
            {
                latitude: 22.5659481, longitude: 88.3531224
            },
            {
                latitude: 22.5720024, longitude: 88.3514815
            }
        ];
        var promise = new Promise(function (resolve) {
            // let coords = {latitude: 22.5413872, longitude: 88.3866939};
            resolve(locations);
        });
        return promise;
    };
    /***
     * Create a script element to insert into the page
     * @returns {Promise}
     * @private
     */
    MapService.prototype.loadGoogleMapApi = function () {
        var _loadScript = function () {
            var script = document.createElement('script');
            // tslint:disable-next-line
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4ToPQa3Ym50zL7JeZTHg30u6kRY3r6NY&libraries=places,geometry&language=it&components=country:IT&callback=initMap";
            script.type = 'text/javascript';
            script.async = true;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(script, s);
        };
        return new Promise(function (resolve) {
            window.initMap = function () {
                return resolve();
            };
            _loadScript();
        });
    };
    return MapService;
}());
MapService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MapService);
export { MapService };
//# sourceMappingURL=map.service.js.map