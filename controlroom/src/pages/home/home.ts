import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map';
import { MapService } from '../../providers/map/map.service';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { ModalController, NavController, AlertController, LoadingController } from 'ionic-angular';
import { FinderPage } from '../finder/finder';
import { ProfilePage } from '../profile/profile';
import { AboutPage } from '../about/about';
import { ImagePage } from '../image/image';
import { SendingPage } from '../sending/sending';
import { Platform } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Vibration } from '@ionic-native/vibration';
import { Shake } from '@ionic-native/shake';
import { NativeAudio } from '@ionic-native/native-audio';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

declare var window:any;
declare var FCMPlugin;

@Component({
  templateUrl: 'home.html'
})
export class HomePage {

	fireauth: any;
	cases: FirebaseListObservable<any>;
	captureDataUrl: string;
	alertCtrl: AlertController;
	loader: any;
	timer: any;

	localized: boolean = false;

	constructor(public modalCtrl: ModalController, public afd: AngularFireDatabase, private localNotifications: LocalNotifications, public nativeAudio: NativeAudio,
				// private backgroundMode: BackgroundMode,
				private platform: Platform, public navCtrl: NavController, private vibration: Vibration, private shake: Shake,
				alertCtrl: AlertController,
				private loadingCtrl: LoadingController,
				private geocoderService: GeocoderService,
				private mapService: MapService,
				private mediaCapture: MediaCapture,
				public af: AngularFire) {
		// this.backgroundMode.enable();
		this.fireauth = firebase.auth();
		this.alertCtrl = alertCtrl;
		console.log("Inside constructor");
		this.cases = af.database.list('/cases');
		console.log(this.cases);
		this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then((res) => {
			console.log("logged in");
		});

		// if (this.platform.is('android')) {
		// 	FCMPlugin.onNotification((data) => {
		// 		console.log(data);
		// 	    if(data.wasTapped){
		// 	      //Notification was received on device tray and tapped by the user.
		// 	      	let alert = this.alertCtrl.create({
		// 				title: 'Emergency!',
		// 				subTitle: data.message,
		// 				buttons: ['OK']
		// 			});
		// 	      	if (data.sendername == 'victim') {
		// 				this.navCtrl.push(FinderPage);
		// 			}else if(data.sendername == 'controlroom'){
		// 				this.navCtrl.push(AboutPage);
		// 			}else if(data.sendername == 'officer'){
		// 				this.navCtrl.push(FinderPage);
		// 			}
		// 			alert.present();

		// 	      // alert( JSON.stringify(data) );
		// 	    }else{
		// 	      //Notification was received in foreground. Maybe the user needs to be notified.
		// 	      // alert( JSON.stringify(data) );
		// 		 //  	let alert = this.alertCtrl.create({
		// 			// 	title: 'Emergency!',
		// 			// 	subTitle: data.message,
		// 			// 	buttons: ['OK']
		// 			// });

		// 			// alert.present();
		// 		    this.localNotifications.schedule({
		// 				title: "Emergency!",
		// 				text: data.message,
		// 				at: new Date(new Date().getTime() + 1 * 1000),
		// 				sound: null
		// 			}); 

		// 			if (data.sendername == 'victim') {
		// 				this.navCtrl.push(FinderPage);
		// 			}else if(data.sendername == 'controlroom'){
		// 				this.navCtrl.push(AboutPage);
		// 			}else if(data.sendername == 'officer'){
		// 				this.navCtrl.push(FinderPage);
		// 			}
		// 	    }
		// 	});

		// }
		
		this.platform.ready().then(() => {
			this.shake.startWatch().subscribe(data =>{
			
				this.localNotifications.schedule({
					title: "In trouble?",
					text: "Should I help you in getting someone to help?",
					at: new Date(new Date().getTime() + 1 * 1000),
					sound: null
				});
			
				this.showHelpModal();
				
				// let confirm = this.alertCtrl.create({
				//   title: 'Emergency?',
				//   message: 'Do you need to trigger emergency service?',
				//   buttons: [
				// 	{
				// 	  text: 'Disagree',
				// 	  handler: () => {
				// 		console.log('Disagree clicked');
				// 	  }
				// 	},
				// 	{
				// 	  text: 'Agree',
				// 	  handler: () => {
				// 		this.vibration.vibrate(20000);
				// 		this.loader = this.loadingCtrl.create({
				// 			content: 'Please wait, while we are searching for help...',
				// 		});
				// 		this.loader.present();
				// 		console.log("Camera is on");
				// 		this.startBuzzer();
				// 		this.vibration.vibrate(10000);
				// 		this.timer = setInterval(() => {
				// 			this.takeSnap();
				// 		}, 2000);
						
				// 		setTimeout(() => {
				// 			window.clearInterval(this.timer);
				// 			this.cameraPreview.stopCamera();
				// 			console.log("Camera stopped");
				// 			this.loader.dismiss().then(() => {this.showConfirmation()});
				// 			this.takeVideo();
				// 		},15000);
				// 		//this.takeVideo();
				// 	  }
				// 	}
				//   ]
				// });
				// confirm.present();
				
			})
		})
		
	}
	
	startBuzzer() {
		this.nativeAudio.preloadComplex('buzzer', 'assets/audio/buzzer.wav', 1, 1, 0).then(() => {
			console.log("audio loaded");
			this.nativeAudio.play('buzzer').then(() => {console.log("playing");});
			this.nativeAudio.loop('buzzer').then(() => {console.log("looping");});
		});
	}
	
	stopBuzzer() {
		this.nativeAudio.stop('buzzer').then(() => {console.log("buzzer stopped");});
		this.nativeAudio.unload('buzzer').then(() => {console.log("buzzer unloaded");});
	}
	
	ionViewWillEnter() {
			
	}

	takeVideo (){
		console.log("testing");
		let options: CaptureVideoOptions = { limit: 1, duration: 15 };
		this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {
				console.log(data);
				this.uploadVideoWithProgress(data);
			},
			(err: CaptureError) => {
				console.log(err);
			}
		 );
	}
	
	upload() {
		let storageRef = firebase.storage().ref();
		console.log(storageRef);
		const filename = Math.floor(Date.now() / 1000);

		// Create a reference to 'images/todays-date.jpg'
		const imageRef = storageRef.child('images/'+filename+'.jpg');
		imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
			console.log("Uploading files");
			this.showSuccesfulUploadAlert('images/'+filename+'.jpg');
		});
	}
	
	/*uploadVideo(data) {
		console.log("uploading video");
		let storageRef = firebase.storage().ref();
		console.log(storageRef);
		const filename = Math.floor(Date.now() / 1000);

		// Create a reference to 'images/todays-date.jpg'
		const imageRef = storageRef.child('video/'+filename+'.txt');
		imageRef.putString(JSON.stringify(data), firebase.storage.StringFormat.RAW).then((snapshot)=> {
			console.log("Uploading files");
			//this.showSuccesfulUploadAlert('images/'+filename+'.jpg');
			//this.loader.dismiss().then(() => {this.showConfirmation()});
		});
	}*/
	
	uploadVideo (data){
	//let videoUrl = data[0].fullPath;
		console.log("recording video");
		let videoUrl = "file:///storage/sdcard1/DCIM/Camera/VID_20170610_152500.mp4";
		(<any>window).resolveLocalFileSystemURL(videoUrl, (res) => {
		  res.file((resFile) => {
			var reader = new FileReader();
			reader.readAsArrayBuffer(resFile);
			reader.onloadend = (evt: any) => {
			  var imgBlob = new Blob([evt.target.result], { type: 'video/mp4' });
			  console.log(imgBlob);
			  console.log("uploading video");
			  let storageRef = firebase.storage().ref();
			  console.log(storageRef);
			  const filename = Math.floor(Date.now() / 1000);

			// Create a reference to 'images/todays-date.jpg'
			  const videoRef = storageRef.child('video/'+filename+'.mp4');
			  
			  //var imageStore = this.firestore.ref().child('image');
				videoRef.put(imgBlob).then((res) => {
				console.log(res);
				console.log('Upload Success');
			  }).catch((err) => {
				console.log('Upload Failed' + err);
			  })
			}
		  })
		})
	}
	
	uploadVideoWithProgress (data){
	let videoUrl = data[0].fullPath;
		console.log(videoUrl);
		console.log("recording video");
		// let videoUrl = "file:///storage/sdcard1/DCIM/Camera/VID_20170610_152500.mp4";
		(<any>window).resolveLocalFileSystemURL(videoUrl, (res) => {
		  res.file((resFile) => {
			var reader = new FileReader();
			reader.readAsArrayBuffer(resFile);
			reader.onloadend = (evt: any) => {
			  var imgBlob = new Blob([evt.target.result], { type: 'video/mp4' });
			  var metadata = {
				  contentType: 'video/mp4'
				};
			  console.log(imgBlob);
			  console.log("uploading video");
			  let storageRef = firebase.storage().ref();
			  console.log(storageRef);
			  const filename = Math.floor(Date.now() / 1000);

			// Create a reference to 'images/todays-date.jpg'
			  const videoRef = storageRef.child('video/'+filename+'.mp4');
			  // Upload file and metadata to the object 'images/mountains.jpg'
				var uploadTask = storageRef.child('video/'+filename+'.mp4').put(imgBlob, metadata);

				// Listen for state changes, errors, and completion of the upload.
				uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
				  function(snapshot) {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
					  case firebase.storage.TaskState.PAUSED: // or 'paused'
						console.log('Upload is paused');
						break;
					  case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running');
						break;
					}
				  }, function(error) {

				  // A full list of error codes is available at
				  // https://firebase.google.com/docs/storage/web/handle-errors
				  /*switch (error.code) {
					case 'storage/unauthorized':
					  console.log("User doesn't have permission to access the object");
					  break;

					case 'storage/canceled':
					  console.log("User canceled the upload");
					  break;

					case 'storage/unknown':
					  console.log("Unknown error occurred, inspect error.serverResponse");
					  break;
				  }*/
				}, function() {
				  // Upload completed successfully, now we can get the download URL
				  var downloadURL = uploadTask.snapshot.downloadURL;
				  console.log(downloadURL);
				});
			  
			}
		  })
		})
	}
	
	showSuccesfulUploadAlert(filename) {
		this.addCase(filename);

		// clear the previous photo data in the variable
		this.captureDataUrl = "";
	}
	
	addCase(filename){
		let id = Math.floor(Date.now() / 1000);
		this.cases.push([{
			id: id,
			victim: "Joe Frey1",
			help_text: "I need medical attention",
			time_of_incident: Date(),
			location: {
				lat : "161.11",
				long : "161.11"
			},
			media: {
				videos: "videos/1495895297.jpg",
				images: [
					{
						filename: filename
					}
				]
			}
		},
		{
			id: id,
			victim: "Joe Frey2",
			help_text: "I need medical attention",
			time_of_incident: Date(),
			location: {
				lat : "161.11",
				long : "161.11"
			},
			media: {
				videos: "videos/1495895297.jpg",
				images: [
					{
						filename: filename
					}
				]
			}
		}]);
		console.log("Uploaded");
		
	}
	
	showConfirmation(){
		console.log("confirmation popup");
		
		let alert = this.alertCtrl.create({
			title: 'Success!',
			subTitle: 'Your case is registered with Lal bazar. Someone is coming for you.',
			buttons: ['OK']
		});
		
	}

	goToProfilePage(): void {
		this.navCtrl.push(ProfilePage);
	}

	showHelpModal(): void {
		let modal = this.modalCtrl.create(ImagePage, { userId: 8675309 },{enableBackdropDismiss: false});
		modal.onDidDismiss(data => {
	     console.log(data);
	     if (data.trigger == true) {
	     	let sendingModal = this.modalCtrl.create(SendingPage, { data: data },{enableBackdropDismiss: false});
	     	data.loader.dismiss();
	     	sendingModal.present();
	     }
	   });
    	modal.present();
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
    const position = this.mapService.mapCenter;
    this.geocoderService.addressForlatLng(position.lat(), position.lng())
      .subscribe((address: string) => {

        const content = `<div padding><strong>${address}</strong></div>`;
        this.mapService.createInfoWindow(content, position);

      });
  }

  /***
   * This event is fired when the user starts dragging the map.
   */
  onDragStart(): void {
    this.mapService.closeInfoWindow();
  }

 /**
   * Get the current position
   */
  public locate(): Promise<any> {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
    return this.mapService.setPosition(15).then(() => {
      this.localized = true;
      
    }).then(() => {
      // TODO why dismiss not working without setTimeout ?
      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    });
  }


}

