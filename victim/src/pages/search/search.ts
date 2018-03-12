

import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
import { MapService } from '../../providers/map/map.service';
import { BasePage } from '../base-page';
import { AboutPage } from '../about/about';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

declare var FCMPlugin;


@Component({
  templateUrl: 'search.tpl.html'
})

export class SearchPage extends BasePage {

  // reference : https://github.com/driftyco/ionic/issues/7223
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;

  private nearbyPlaces: Array<any> = [];
  private addressElement: HTMLInputElement = null;
  fireauth: any;
  firestore = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/messages');

  constructor(public afd: AngularFireDatabase,
              public af: AngularFire,
              public navCtrl: NavController,
              private mapService: MapService,
              private zone: NgZone,
              protected alertCtrl: AlertController,
              private viewCtrl: ViewController) {
    super(alertCtrl);
    this.fireauth = firebase.auth();
    this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then((res) => {
      console.log("logged in");
    });

  }

  ionViewDidLoad() {
    // this.initAutocomplete();
    this.loadNearbyPlaces();
  }

  dismiss(location?: google.maps.LatLng) {
    if (location) {
      this.mapService.mapCenter = location;
    }
    if (this.addressElement) {
      this.addressElement.value = '';
    }
    this.viewCtrl.dismiss();
  }

  tokensetup() {
      var promise = new Promise((resolve, reject) => {
        FCMPlugin.getToken(function(token){
        resolve(token);
        }, (err) => {
          reject(err);
      });
      })
      return promise;
  }

  storetoken(t) {
      this.afd.list(this.firestore).push({
        uid: firebase.auth().currentUser.uid,
        devtoken: t
          
      }).then(() => {
        console.log('Token stored');
        }).catch(() => {
          console.log('Token not stored');
        })
   
      this.afd.list(this.firemsg).push({
        messageto: 'officer',
        sendername: 'victim',
        message: 'Control Room: Your case has been registered with Lal Bazar.'
      }).then(() => {
        console.log('Message stored');
        }).catch(() => {
          console.log('Message not stored');
    })  

    this.afd.list(this.firemsg).push({
        messageto: 'officer',
        sendername: 'officer',
        message: 'Control Room: A case has been assigned to you. Please look into it Asap.'
      }).then(() => {
        console.log('Message stored');
        }).catch(() => {
          console.log('Message not stored');
    }) 
  }

  /***
   * Place item has been selected
   */
  selectPlace(place: any) {
    let alert = this.alertCtrl.create({
    title: 'Officer Assignment',
    message: 'Do you want to proceed with the assignment?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Ignore this case');
        }
      },
      {
        text: 'Assign',
        handler: () => {
          console.log('Assign on this case');
          this.tokensetup().then((token) => {
            this.storetoken(token);
            this.navCtrl.push(AboutPage);
          })
        }
      }
    ]
  });
  alert.present();
    // this.dismiss(place.geometry.location);
  }

  private initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.mapService.createAutocomplete(this.addressElement).subscribe((location) => {
      this.dismiss(location);
    }, (error) => {
      this.displayErrorAlert();
      console.error(error);
    });
  }

  private loadNearbyPlaces(): void {
    this.nearbyPlaces = [
      {
        distance:"179.24",
        name:"Pravas Sen",
        vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
        icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
      },
      {
        distance:"279.24",
        name:"Pravas Sen",
        vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
        icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
      },
      {
        distance:"379.24",
        name:"Pravas Sen",
        vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
        icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
      },
      {
        distance:"479.24",
        name:"Pravas Sen",
        vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
        icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
      },
      {
        distance:"579.24",
        name:"Pravas Sen",
        vicinity:"98, Christopher Road, Brindaban Garden, Seal Lane, Tangra, Kolkata",
        icon:"https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png"
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
  }
}
