var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Renderer } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { CameraPreview } from '@ionic-native/camera-preview';
import { MediaCapture } from '@ionic-native/media-capture';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { AngularFire } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
var SendingPage = (function () {
    function SendingPage(nav, navParams, viewCtrl, renderer, loadingCtrl, cameraPreview, af, vibration, nativeAudio, alertCtrl, afd, mediaCapture) {
        this.nav = nav;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.renderer = renderer;
        this.loadingCtrl = loadingCtrl;
        this.cameraPreview = cameraPreview;
        this.af = af;
        this.vibration = vibration;
        this.nativeAudio = nativeAudio;
        this.alertCtrl = alertCtrl;
        this.afd = afd;
        this.mediaCapture = mediaCapture;
        this.chartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.chartLabels = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
        this.chartType = 'doughnut';
        this.chartLegend = true;
        this.chartData = [{
                data: [0, 100]
            }];
        this.firestore = firebase.database().ref('/pushtokens');
        this.firemsg = firebase.database().ref('/messages');
        this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
        this.case = navParams.data;
        this.fireauth = firebase.auth();
        this.cases = af.database.list('/cases');
        this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then(function (res) {
            console.log("logged in");
        });
        this.loadProgress = 0;
        this.counter = 0;
        console.log(navParams);
        this.captureDataUrl = navParams.data.data.imageList;
        this.downloadPhotoUrl = [];
        this.grid = Array(Math.ceil(this.captureDataUrl.length / 4));
        var rowNum = 0; //counter to iterate over the rows in the grid
        for (var i = 0; i < this.captureDataUrl.length && i < 12; i += 4) {
            this.grid[rowNum] = Array(4); //declare two elements per row
            if (this.captureDataUrl[i]) {
                this.grid[rowNum][0] = this.captureDataUrl[i]; //insert image
            }
            if (this.captureDataUrl[i + 1]) {
                this.grid[rowNum][1] = this.captureDataUrl[i + 1];
            }
            if (this.captureDataUrl[i + 2]) {
                this.grid[rowNum][2] = this.captureDataUrl[i + 2]; //insert image
            }
            if (this.captureDataUrl[i + 3]) {
                this.grid[rowNum][3] = this.captureDataUrl[i + 3];
            }
            rowNum++; //go on to the next row
        }
        this.upload();
    }
    SendingPage.prototype.startBuzzer = function () {
        var _this = this;
        this.nativeAudio.preloadComplex('buzzer', 'assets/audio/buzzer.wav', 1, 1, 0).then(function () {
            console.log("audio loaded");
            _this.nativeAudio.play('buzzer').then(function () { console.log("playing"); });
            _this.nativeAudio.loop('buzzer').then(function () { console.log("looping"); });
        });
    };
    SendingPage.prototype.stopBuzzer = function () {
        this.nativeAudio.stop('buzzer').then(function () { console.log("buzzer stopped"); });
        this.nativeAudio.unload('buzzer').then(function () { console.log("buzzer unloaded"); });
    };
    SendingPage.prototype.takeVideo = function () {
        var _this = this;
        console.log("testing");
        var options = { limit: 1, duration: 15 };
        this.mediaCapture.captureVideo(options).then(function (data) {
            console.log(data);
            _this.uploadVideoWithProgress(data[0]);
        }, function (err) {
            console.log(err);
        });
    };
    SendingPage.prototype.uploadVideoWithProgress = function (data) {
        var _this = this;
        //let videoUrl = data[0].fullPath;
        this.statusTitle = "Uploading video..";
        this.loadProgress = 0;
        console.log("recording video");
        var videoUrl = data.fullPath;
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
                        _this.loadProgress = Math.round(progress);
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
                        console.log(error);
                    }, function () {
                        // Upload completed successfully, now we can get the download URL
                        _this.downloadURL = uploadTask.snapshot.downloadURL;
                        console.log(_this.downloadURL);
                        _this.addCase("I need serious medical attention. Please send asap!");
                        _this.statusTitle = "Searching for Officer..";
                    });
                };
            });
        });
    };
    SendingPage.prototype.addCase = function (message) {
        var id = Math.floor(Date.now() / 1000);
        var caseObject = {
            id: id,
            status: "pending",
            victim: "Jaclyn Mathew",
            help_text: message,
            time_of_incident: Date(),
            location: {
                lat: "22.5659481",
                long: "88.3531224"
            },
            media: {
                videos: this.downloadURL,
                images: this.downloadPhotoUrl
            }
        };
        console.log(caseObject);
        this.cases.push(caseObject);
        console.log("Uploaded");
    };
    SendingPage.prototype.upload = function () {
        var _this = this;
        var storageRef = firebase.storage().ref();
        console.log(storageRef);
        this.statusTitle = "Uploading images";
        var _loop_1 = function (i) {
            var filename = Math.floor(Date.now() / 1000);
            // Create a reference to 'images/todays-date.jpg'
            var imageRef = storageRef.child('images/' + filename + '_' + i + '.jpg');
            var uploadTask = imageRef.putString(this_1.captureDataUrl[i], firebase.storage.StringFormat.DATA_URL);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function (error) {
                console.log(error);
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
                console.log("Upload successful");
                _this.downloadPhotoUrl.push({ filename: uploadTask.snapshot.downloadURL });
                _this.counter++;
                _this.loadProgress = Math.round(_this.counter / (_this.captureDataUrl.length) * 100);
                if (_this.loadProgress == 100) {
                    _this.statusTitle = "Starting video streaming..";
                    _this.takeVideo();
                }
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.captureDataUrl.length; i++) {
            _loop_1(i);
        }
    };
    return SendingPage;
}());
SendingPage = __decorate([
    Component({
        templateUrl: 'sending.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController, Renderer,
        LoadingController, CameraPreview, AngularFire,
        Vibration, NativeAudio, AlertController,
        AngularFireDatabase, MediaCapture])
], SendingPage);
export { SendingPage };
//# sourceMappingURL=sending.js.map