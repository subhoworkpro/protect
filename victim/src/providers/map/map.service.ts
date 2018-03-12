/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geolocation, Geoposition } from 'ionic-native';
import { MapConst } from './map.constants';
import {  } from '@types/googlemaps';

interface IMapOptions {
  lat: number;
  lon: number;
  zoom: number;
}

@Injectable()
export class MapService {

  private map: google.maps.Map = null;
  private infoWindow: google.maps.InfoWindow = null;
  markers: any = [];
  locations: any = [];

  constructor() {
  }

  public createMap(mapEl: Element, opts: IMapOptions = {
    lat: MapConst.DEFAULT_LAT,
    lon: MapConst.DEFAULT_LNG,
    zoom: MapConst.DEFAULT_ZOOM
  }): Promise<google.maps.Map> {

    return this.loadMap().then(() => {
      const myLatLng = new google.maps.LatLng(opts.lat, opts.lon);
      const styleArray = [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            {visibility: 'off'}
          ]
        }
      ];

      const mapOptions: google.maps.MapOptions = {
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

      this.map = new google.maps.Map(mapEl, mapOptions);
      return this.map;
    });
  }

  /**
   * return the coordinates of the center of map
   * @returns {LatLng}
   */
  public get mapCenter(): google.maps.LatLng {
    return this.map.getCenter();
  }

  public set mapCenter(location: google.maps.LatLng) {
    this.map.setCenter(location);
  }

  /***
   * return map html element
   * @returns {Element}
   */
  public get mapElement(): Element {
    return this.map.getDiv();
  }

  /***
   * create an infoWindow and display it in the map
   * @param content - the content to display inside the infoWindow
   * @param position
   */
  public createInfoWindow(content: string, position: google.maps.LatLng): void {
    // this.closeInfoWindow();
    const opt: google.maps.InfoWindowOptions = {
      content,
      position,
      pixelOffset: new google.maps.Size(0, -60),
      disableAutoPan: true,
      maxWidth: 150,
    };
    this.infoWindow = new google.maps.InfoWindow(opt);
    setTimeout(() => this.infoWindow.open(this.map), 100);
  }

  /***
   * close the current infoWindow
   */
  public closeInfoWindow(): void {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
  }

  /***
   * create Place Autocomplete
   * ref: https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete
   * @param addressEl
   * @returns {Observable}
   */
  public createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

  /***
   * set map position and the relative center and zoom
   * @returns {Promise<google.maps.LatLng>}
   */
  public setPosition(zoom: number): Promise<google.maps.LatLng> {
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

     return this.getCurrentPosition().then((locations: any) => {

      if(locations.length <= 0){
        const myLatLng = new google.maps.LatLng(22.5720024, 88.3514815);
        this.map.setCenter(myLatLng);
      }else{ 
        const myLatLng = new google.maps.LatLng(locations[0].latitude, locations[0].longitude);
        this.map.setCenter(myLatLng);
      }
      
      // this.map.setZoom(MapConst.MAX_ZOOM);

      //for geolocation testing
       const options1 = {
        timeout: 30000,
        enableHighAccuracy: true,
        maximumAge: 60000
      };
      navigator.geolocation.getCurrentPosition(
          (pos: Geoposition) => {
        console.log(pos.coords);
      },
          (er) => { console.log(er);},
          options1
      );
      Geolocation.getCurrentPosition(options1).then((pos: Geoposition) => {
        console.log(pos.coords);
      });

      for (let i = 0; i < locations.length; i++) {
        this.addMarker(locations[i].latitude, locations[i].longitude, locations[i].type);
      }
      
      this.map.setZoom(zoom);
      return this.mapCenter;
    });
  }

  icons: any = {
    victim: {
      icon: 'assets/icon/victim.png'
    },
    police: {
      icon: 'assets/icon/police.png'
    }
  }

  public addMarker(lat: number, lng: number, feature: any): void {

    let latLng = new google.maps.LatLng(lat, lng);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      icon: this.icons[feature].icon    //Doesn't do anything
    });

    this.markers.push(marker);
  }

  /***
   * trigger map resize event
   */
  public resizeMap(): void {
    if (this.map) {
      google.maps.event.trigger(this.map, 'resize');
    }
  }

  /***
   * google map place searches
   * @returns {Observable}
   */
  public loadNearbyPlaces(): Observable<any> {
    const position: google.maps.LatLng = this.mapCenter;

    const placesService = new google.maps.places.PlacesService(this.map);
    const request: google.maps.places.PlaceSearchRequest = {
      location: position,
      radius: 500
    };

    return new Observable((sub: any) => {
      placesService.nearbySearch(request, (results, status) => {
        const _nearbyPlaces: Array<any> = [];
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            const place: any = results[i];
            const distance: number =
              google.maps.geometry.spherical.computeDistanceBetween(position, place.geometry.location);
            place.distance = distance.toFixed(2);
            _nearbyPlaces.push(place);
          }
          sub.next(_nearbyPlaces);
          sub.complete();
        } else {
          sub.error({
            message: `Invalid response status from nearbySearch : ${status}`
          });
        }
      });
    });
  }

  /***
   * Load Google Map Api in async mode
   * @returns {Promise}
   */
  private loadMap(): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      if ((<any>window).google && (<any>window).google.maps) {
        resolve();
      } else {
        this.loadGoogleMapApi().then(() => resolve()).catch(reason => {
          reject(reason);
        });
      }
    });
  }

  /***
   * get the current location using Geolocation cordova plugin
   * @param maximumAge
   * @returns {Promise<Coordinates>}
   */
  private getCurrentPosition(maximumAge: number = 60000): Promise<Coordinates> {
    const options = {
      timeout: 30000,
      enableHighAccuracy: true,
      maximumAge
    };
    // return Geolocation.getCurrentPosition(options).then((pos: Geoposition) => {
    //   return pos.coords;
    // });
    return this.getCoords().then((locations) => {
      return locations;
    })
  }

  public setLocation(loc: any) {
      this.locations = loc;
  }


  private getCoords() {
      let locations = [
        {
          latitude: 22.5284754, longitude: 88.334756 // latitude: 22.5659481,longitude: 88.3531224
        },
        {
          latitude: 22.5168807, longitude: 88.3440739 // latitude: 22.5720024, longitude: 88.3514815
        }
      ]
      let promise = new Promise((resolve) => {
        // let coords = {latitude: 22.5413872, longitude: 88.3866939};
        resolve(this.locations);
        })
      return promise;
  }
  /***
   * Create a script element to insert into the page
   * @returns {Promise}
   * @private
   */
  private loadGoogleMapApi(): Promise<any> {
    const _loadScript = () => {
      const script = document.createElement('script');
      // tslint:disable-next-line
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC4ToPQa3Ym50zL7JeZTHg30u6kRY3r6NY&libraries=places,geometry&language=it&components=country:IT&callback=initMap`;
      script.type = 'text/javascript';
      script.async = true;
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(script, s);
    };

    return new Promise((resolve: Function) => {
      (<any>window).initMap = () => {
        return resolve();
      };
      _loadScript();
    });
  }
}
