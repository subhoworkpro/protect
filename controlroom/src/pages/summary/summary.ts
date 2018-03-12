import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map';
import { Vibration } from 'ionic-native';
import { MapService } from '../../providers/map/map.service';
import { LoadingController, AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { SearchPage } from '../search/search';
import { ConfirmationPage } from '../confirmation/confirmation';
import { BasePage } from '../base-page';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
  templateUrl: 'summary.html'
})
export class SummaryPage extends BasePage {

  localized: boolean = false;

  fireauth: any;
  cases: FirebaseListObservable<any>;
  casesFiled: Array<any> = [];
  loader: any;

  constructor(private platform: Platform,
              private nav: NavController,
              private geocoderService: GeocoderService,
              private mapService: MapService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              protected alertCtrl: AlertController,
              public af: AngularFire) {
    super(alertCtrl);
    // let alert = this.alertCtrl.create({
    //   title: 'Emergency!',
    //   subTitle: "Your case has been registered with LalBazaar Control Room.",
    //   buttons: ['OK']
    // });

    this.fireauth = firebase.auth();
    console.log("Inside about constructor");
    this.cases = af.database.list('/cases');
    this.loader = this.loadingCtrl.create({
      content: 'Please..wait...!',
    });
    this.loader.present();
    this.cases.subscribe(data => {
      this.casesFiled = data.reverse();
      console.log("List fetched");
      this.loader.dismiss();
    },
    (ex) => {
      console.log('Found exception: ', ex);
    });

    // alert.present();
  }

  /***
   * This event is fired when map has fully loaded
   */
  onMapReady(): Promise<any> {
    // I must wait platform.ready() to use plugins ( in this case Geolocation plugin ).
    return this.platform.ready().then(() => {
      return this.locate().then(() => {
        const mapElement: Element = this.mapService.mapElement;
        if (mapElement) {
          mapElement.classList.add('show-map');
          this.mapService.resizeMap();
        }
      });
    });
  }

  /***
   * This event is fired when the map becomes idle after panning or zooming.
   */
  onMapIdle(): void {
    if (!this.localized) return;
    // for(let i = 0; i < this.casesFiled.length ; i++){
    //   const position = new google.maps.LatLng(this.casesFiled[i].location.lat, this.casesFiled[i].location.long);
    //   this.geocoderService.addressForlatLng(position.lat(), position.lng())
    //     .subscribe((address: string) => {
    //       let res = address.split(",");
    //       const content = `<div class="address-police" ><span style="font-weight:bold;color:red;">${this.casesFiled[i].victim}</span><br>${res[1]}</div>`;
    //       this.mapService.createInfoWindow(content, position);

    //     }, (error) => {
    //       this.displayErrorAlert();
    //       console.error(error);
    //     });
    // }
  }

  /***
   * This event is fired when the user starts dragging the map.
   */
  onDragStart(): void {
    // this.mapService.closeInfoWindow();
  }

  openModal(): void {
    const searchModal = this.modalCtrl.create(SearchPage);
    searchModal.present();
  }

  goToConfirmation(): void {
    this.nav.push(ConfirmationPage);
  }

  /**
   * Get the current position
   */
  public locate(): Promise<any> {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
    for(let i = 0; i < this.casesFiled.length ; i++){
      const position = new google.maps.LatLng(this.casesFiled[i].location.lat, this.casesFiled[i].location.long);
      this.geocoderService.addressForlatLng(position.lat(), position.lng())
        .subscribe((address: string) => {
          let res = address.split(",");
          const content = `<div class="address-police" ><span style="font-weight:bold;color:red;">${this.casesFiled[i].victim}</span><br>${res[1]}</div>`;
          this.mapService.createInfoWindow(content, position);

        }, (error) => {
          this.displayErrorAlert();
          console.error(error);
        });
    }
    this.mapService.setLocation(this.parseLocation(this.casesFiled));
    // this.mapService.setLocation([{
    //       latitude: 22.5284754, longitude: 88.334756, type: 'victim' // latitude: 22.5659481,longitude: 88.3531224
    //     },
    //     {
    //       latitude: 22.5168807, longitude: 88.3440739, type: 'police' // latitude: 22.5720024, longitude: 88.3514815
    //     },
    //     {
    //       latitude: 22.5720024, longitude: 88.3514815, type: 'victim' // latitude: 22.5720024, longitude: 88.3514815
    //     }]);
    return this.mapService.setPosition(14).then(() => {
      this.localized = true;
      // Vibrate the device for a second
      Vibration.vibrate(1000);
    }).catch(error => {
      this.alertNoGps();
      console.warn(error);
    }).then(() => {
      // TODO why dismiss not working without setTimeout ?
      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    });
  }

  private alertNoGps() {
    const alert = this.alertCtrl.create({
      title: 'Life line',
      subTitle: 'Gps and network locations are unavailable. Click OK to retry',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          setTimeout(() => this.locate(), 1500);
        }
      }],
    });
    alert.present();
  }

  private parseLocation(cases){
    let newArr: any = [];
    cases.forEach(function (item){
        if(item.status == 'pending'){
          newArr.push({latitude: item.location.lat, longitude: item.location.long, type: item.type});
        }
    });
    return newArr;
  }
}
