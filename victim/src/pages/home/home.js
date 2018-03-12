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
import { MapService } from '../../providers/map/map.service';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { ModalController, NavController, AlertController, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ImagePage } from '../image/image';
import { SendingPage } from '../sending/sending';
import { Platform } from 'ionic-angular';
import { MediaCapture } from '@ionic-native/media-capture';
import { Vibration } from '@ionic-native/vibration';
import { Shake } from '@ionic-native/shake';
import { NativeAudio } from '@ionic-native/native-audio';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFire } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
var HomePage = (function () {
    function HomePage(modalCtrl, afd, localNotifications, nativeAudio, 
        // private backgroundMode: BackgroundMode,
        platform, navCtrl, vibration, shake, alertCtrl, loadingCtrl, geocoderService, mapService, mediaCapture, af) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.afd = afd;
        this.localNotifications = localNotifications;
        this.nativeAudio = nativeAudio;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.vibration = vibration;
        this.shake = shake;
        this.loadingCtrl = loadingCtrl;
        this.geocoderService = geocoderService;
        this.mapService = mapService;
        this.mediaCapture = mediaCapture;
        this.af = af;
        this.localized = false;
        // this.backgroundMode.enable();
        this.fireauth = firebase.auth();
        this.alertCtrl = alertCtrl;
        console.log("Inside constructor");
        this.cases = af.database.list('/cases');
        console.log(this.cases);
        this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then(function (res) {
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
        this.platform.ready().then(function () {
            _this.shake.startWatch().subscribe(function (data) {
                _this.localNotifications.schedule({
                    title: "In trouble?",
                    text: "Should I help you in getting someone to help?",
                    at: new Date(new Date().getTime() + 1 * 1000),
                    sound: null
                });
                _this.showHelpModal();
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
            });
        });
    }
    HomePage.prototype.startBuzzer = function () {
        var _this = this;
        this.nativeAudio.preloadComplex('buzzer', 'assets/audio/buzzer.wav', 1, 1, 0).then(function () {
            console.log("audio loaded");
            _this.nativeAudio.play('buzzer').then(function () { console.log("playing"); });
            _this.nativeAudio.loop('buzzer').then(function () { console.log("looping"); });
        });
    };
    HomePage.prototype.stopBuzzer = function () {
        this.nativeAudio.stop('buzzer').then(function () { console.log("buzzer stopped"); });
        this.nativeAudio.unload('buzzer').then(function () { console.log("buzzer unloaded"); });
    };
    HomePage.prototype.ionViewWillEnter = function () {
    };
    HomePage.prototype.takeVideo = function () {
        var _this = this;
        console.log("testing");
        var options = { limit: 1, duration: 15 };
        this.mediaCapture.captureVideo(options).then(function (data) {
            console.log(data);
            _this.uploadVideoWithProgress(data);
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.upload = function () {
        var _this = this;
        var storageRef = firebase.storage().ref();
        console.log(storageRef);
        var filename = Math.floor(Date.now() / 1000);
        // Create a reference to 'images/todays-date.jpg'
        var imageRef = storageRef.child('images/' + filename + '.jpg');
        imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then(function (snapshot) {
            console.log("Uploading files");
            _this.showSuccesfulUploadAlert('images/' + filename + '.jpg');
        });
    };
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
    HomePage.prototype.uploadVideo = function (data) {
        //let videoUrl = data[0].fullPath;
        console.log("recording video");
        var videoUrl = "file:///storage/sdcard1/DCIM/Camera/VID_20170610_152500.mp4";
        window.resolveLocalFileSystemURL(videoUrl, function (res) {
            res.file(function (resFile) {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = function (evt) {
                    var imgBlob = new Blob([evt.target.result], { type: 'video/mp4' });
                    console.log(imgBlob);
                    console.log("uploading video");
                    var storageRef = firebase.storage().ref();
                    console.log(storageRef);
                    var filename = Math.floor(Date.now() / 1000);
                    // Create a reference to 'images/todays-date.jpg'
                    var videoRef = storageRef.child('video/' + filename + '.mp4');
                    //var imageStore = this.firestore.ref().child('image');
                    videoRef.put(imgBlob).then(function (res) {
                        console.log(res);
                        console.log('Upload Success');
                    }).catch(function (err) {
                        console.log('Upload Failed' + err);
                    });
                };
            });
        });
    };
    HomePage.prototype.uploadVideoWithProgress = function (data) {
        var videoUrl = data[0].fullPath;
        console.log(videoUrl);
        console.log("recording video");
        // let videoUrl = "file:///storage/sdcard1/DCIM/Camera/VID_20170610_152500.mp4";
        window.resolveLocalFileSystemURL(videoUrl, function (res) {
            res.file(function (resFile) {
                var reader = new FileReader();
                reader.readAsArrayBuffer(resFile);
                reader.onloadend = function (evt) {
                    var imgBlob = new Blob([evt.target.result], { type: 'video/mp4' });
                    var metadata = {
                        contentType: 'video/mp4'
                    };
                    console.log(imgBlob);
                    console.log("uploading video");
                    var storageRef = firebase.storage().ref();
                    console.log(storageRef);
                    var filename = Math.floor(Date.now() / 1000);
                    // Create a reference to 'images/todays-date.jpg'
                    var videoRef = storageRef.child('video/' + filename + '.mp4');
                    // Upload file and metadata to the object 'images/mountains.jpg'
                    var uploadTask = storageRef.child('video/' + filename + '.mp4').put(imgBlob, metadata);
                    // Listen for state changes, errors, and completion of the upload.
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {
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
                    }, function () {
                        // Upload completed successfully, now we can get the download URL
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        console.log(downloadURL);
                    });
                };
            });
        });
    };
    HomePage.prototype.showSuccesfulUploadAlert = function (filename) {
        this.addCase(filename);
        // clear the previous photo data in the variable
        this.captureDataUrl = "";
    };
    HomePage.prototype.addCase = function (filename) {
        var id = Math.floor(Date.now() / 1000);
        this.cases.push([{
                id: id,
                victim: "Joe Frey1",
                help_text: "I need medical attention",
                time_of_incident: Date(),
                location: {
                    lat: "161.11",
                    long: "161.11"
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
                    lat: "161.11",
                    long: "161.11"
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
    };
    HomePage.prototype.showConfirmation = function () {
        console.log("confirmation popup");
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Your case is registered with Lal bazar. Someone is coming for you.',
            buttons: ['OK']
        });
    };
    HomePage.prototype.goToProfilePage = function () {
        this.navCtrl.push(ProfilePage);
    };
    HomePage.prototype.showHelpModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(ImagePage, { userId: 8675309 }, { enableBackdropDismiss: false });
        modal.onDidDismiss(function (data) {
            console.log(data);
            if (data.trigger == true) {
                var sendingModal = _this.modalCtrl.create(SendingPage, { data: data }, { enableBackdropDismiss: false });
                data.loader.dismiss();
                sendingModal.present();
            }
        });
        modal.present();
    };
    /***
       * This event is fired when map has fully loaded
       */
    HomePage.prototype.onMapReady = function () {
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
    HomePage.prototype.onMapIdle = function () {
        var _this = this;
        if (!this.localized)
            return;
        var position = this.mapService.mapCenter;
        this.geocoderService.addressForlatLng(position.lat(), position.lng())
            .subscribe(function (address) {
            var content = "<div padding><strong>" + address + "</strong></div>";
            _this.mapService.createInfoWindow(content, position);
        });
    };
    /***
     * This event is fired when the user starts dragging the map.
     */
    HomePage.prototype.onDragStart = function () {
        this.mapService.closeInfoWindow();
    };
    /**
      * Get the current position
      */
    HomePage.prototype.locate = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Please wait...',
        });
        loader.present();
        return this.mapService.setPosition(15).then(function () {
            _this.localized = true;
        }).then(function () {
            // TODO why dismiss not working without setTimeout ?
            setTimeout(function () {
                loader.dismiss();
            }, 1000);
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [ModalController, AngularFireDatabase, LocalNotifications, NativeAudio,
        Platform, NavController, Vibration, Shake,
        AlertController,
        LoadingController,
        GeocoderService,
        MapService,
        MediaCapture,
        AngularFire])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map