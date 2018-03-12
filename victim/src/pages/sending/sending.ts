import { Component,Renderer  } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SearchPage } from '../search/search';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { FinderPage } from '../finder/finder';
import firebase from 'firebase';

declare var window:any;

@Component({
  templateUrl: 'sending.html'
})
export class SendingPage {

	chartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
	chartType: string = 'doughnut';
	chartLegend: boolean = true;

	chartData: any[] = [{
        data: [0, 100]
    }];	
	case: any;
	loadProgress: any;
	timer: any;
	photoTimer: any;
	timeout: any;
	photoTimeout: any;
	loader: any;
	counter: any;
	photoCounter: any;
	fireauth: any;
	grid: Array<Array<string>>;
	cases: FirebaseListObservable<any>;
	captureDataUrl: string[];
	statusTitle: string;
	downloadURL: string;
	downloadPhotoUrl: any[];
	firestore = firebase.database().ref('/pushtokens');
  	firemsg = firebase.database().ref('/messages');
	constructor(private nav: NavController, public navParams: NavParams, public viewCtrl: ViewController, public renderer: Renderer,
				private loadingCtrl: LoadingController, private cameraPreview: CameraPreview, public af: AngularFire,
				private vibration: Vibration, public nativeAudio: NativeAudio, public alertCtrl: AlertController, 
				public afd: AngularFireDatabase, private mediaCapture: MediaCapture, ) {
		
		this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
		this.case = navParams.data;
		this.fireauth = firebase.auth();
		this.cases = af.database.list('/cases');
		this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then((res) => {
			console.log("logged in");
		});
		this.loadProgress = 0;
		this.counter = 0;
		console.log(navParams);
		this.captureDataUrl = navParams.data.data.imageList;
		this.downloadPhotoUrl = [];
		this.grid = Array(Math.ceil(this.captureDataUrl.length/4));
		let rowNum = 0; //counter to iterate over the rows in the grid

		  for (let i = 0; i < this.captureDataUrl.length && i < 12; i+=4) { //iterate images

		    this.grid[rowNum] = Array(4); //declare two elements per row

		    if (this.captureDataUrl[i]) { //check file URI exists
		      this.grid[rowNum][0] = this.captureDataUrl[i] //insert image
		    }

		    if (this.captureDataUrl[i+1]) { //repeat for the second image
		      this.grid[rowNum][1] = this.captureDataUrl[i+1]
		    }

		    if (this.captureDataUrl[i+2]) { //check file URI exists
		      this.grid[rowNum][2] = this.captureDataUrl[i+2] //insert image
		    }

		    if (this.captureDataUrl[i+3]) { //repeat for the second image
		      this.grid[rowNum][3] = this.captureDataUrl[i+3]
		    }

		    rowNum++; //go on to the next row
		  }


		this.upload();

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


	takeVideo (){
		console.log("testing");
		let options: CaptureVideoOptions = { limit: 1, duration: 15 };
		this.mediaCapture.captureVideo(options).then((data: MediaFile[]) => {
				console.log(data);
				this.uploadVideoWithProgress(data[0]);
			},
			(err: CaptureError) => {
				console.log(err);
			}
		 );
	}
	

	uploadVideoWithProgress (data){
	//let videoUrl = data[0].fullPath;
		this.statusTitle = "Uploading video..";
		this.loadProgress = 0;
		console.log("recording video");
		let videoUrl = data.fullPath;
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
				  (snapshot) => {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					this.loadProgress = Math.round(progress);
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
					  case firebase.storage.TaskState.PAUSED: // or 'paused'
						console.log('Upload is paused');
						break;
					  case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running');
						break;
					}
				  }, (error) => {
				  	console.log(error);
				}, () => {
				  // Upload completed successfully, now we can get the download URL
				  this.downloadURL = uploadTask.snapshot.downloadURL;
				  console.log(this.downloadURL);
				  this.addCase("I need serious medical attention. Please send asap!");
				  this.statusTitle = "Searching for Officer..";
				});
			  
			}
		  })
		})
	}


	addCase(message){

		let id = Math.floor(Date.now() / 1000);
		let caseObject = {
			id: id,
			status: "pending",
			victim: "Jaclyn Mathew",
			help_text: message,
			time_of_incident: Date(),
			location: {
				lat : "22.5659481",
				long : "88.3531224"
			},
			media: {
				videos: this.downloadURL,
				images: this.downloadPhotoUrl
			}
		};
		console.log(caseObject);
		this.cases.push(caseObject);
		console.log("Uploaded");
		
	}

	upload() {
		let storageRef = firebase.storage().ref();
		console.log(storageRef);
		this.statusTitle = "Uploading images";
		for(let i = 0; i < this.captureDataUrl.length; i++) {
			let filename = Math.floor(Date.now() / 1000);

		// Create a reference to 'images/todays-date.jpg'
			let imageRef = storageRef.child('images/'+filename+'_'+i+'.jpg');
			let uploadTask = imageRef.putString(this.captureDataUrl[i], firebase.storage.StringFormat.DATA_URL);

			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			  (snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
			  }, (error) => {
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
			}, () => {
			  console.log("Upload successful");
			  this.downloadPhotoUrl.push({filename: uploadTask.snapshot.downloadURL});
			  this.counter++;
			  this.loadProgress = Math.round(this.counter / (this.captureDataUrl.length) * 100);
			  if (this.loadProgress == 100) {
			  	this.statusTitle = "Starting video streaming..";
			  	this.takeVideo();
			  }
			});


		}
		
	}

}
