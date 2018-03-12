/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
import { Observable } from 'rxjs/Observable';
import { MapConst } from './map.constants';
var MapServiceMock = (function () {
    function MapServiceMock() {
    }
    MapServiceMock.prototype.createMap = function (mapEl, opts) {
        if (opts === void 0) { opts = {
            lat: MapConst.DEFAULT_LAT,
            lon: MapConst.DEFAULT_LNG,
            zoom: MapConst.DEFAULT_ZOOM
        }; }
        return Promise.resolve(new google.maps.Map(mapEl));
    };
    Object.defineProperty(MapServiceMock.prototype, "mapCenter", {
        get: function () {
            return new google.maps.LatLng(MapConst.DEFAULT_LAT, MapConst.DEFAULT_LNG);
        },
        set: function (location) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapServiceMock.prototype, "mapElement", {
        get: function () {
            return new Element();
        },
        enumerable: true,
        configurable: true
    });
    MapServiceMock.prototype.createInfoWindow = function (content, position) {
    };
    MapServiceMock.prototype.closeInfoWindow = function () {
    };
    MapServiceMock.prototype.createAutocomplete = function (addressEl) {
        return Observable.of(new google.maps.LatLng(MapConst.DEFAULT_LAT, MapConst.DEFAULT_LNG));
    };
    MapServiceMock.prototype.setPosition = function () {
        return Promise.resolve();
    };
    MapServiceMock.prototype.resizeMap = function () {
    };
    MapServiceMock.prototype.loadMap = function () {
        return Promise.resolve();
    };
    MapServiceMock.prototype.loadNearbyPlaces = function () {
        return Observable.of([]);
    };
    return MapServiceMock;
}());
export { MapServiceMock };
//# sourceMappingURL=map-mock.service.js.map