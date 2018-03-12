import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { FinderPage } from '../finder/finder';
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
  templateUrl: 'email.html'
})
export class EmailPage {
	case: any;
	fireauth: any;
	cases: FirebaseListObservable<any>;
	constructor(private photoViewer: PhotoViewer, private nav: NavController, public navParams: NavParams, public af: AngularFire, protected alertCtrl: AlertController) {
		this.case = navParams.data;
		this.fireauth = firebase.auth();
		this.cases = af.database.list('/cases');
		console.log(navParams);
	}
	goToSearchPage(): void {
		this.nav.push(SearchPage);
	}

	goToFinderPage(): void {
		this.nav.push(FinderPage);
	}

	cancel(): void {
		this.nav.pop();
	}

	fileGD(data): void {
		let alert = this.alertCtrl.create({
	      title: 'Success!',
	      subTitle: "GD Filed successfully.",
	      buttons: [{
			        text: 'OK',
			        handler: () => {
			          this.cases.update(data.$key,{status: "GD FILED"});
			          this.nav.pop();
			        }
			      }]
	    });

    	alert.present();
	}

	fileFIR(data) {
		let alert = this.alertCtrl.create({
	      title: 'Success!',
	      subTitle: "FIR Filed successfully.",
	      buttons: [{
			        text: 'OK',
			        handler: () => {
			       	  this.cases.update(data.$key,{status: "FIR FILED"});
			          this.nav.pop();
			        }
			      }]
	    });

    	alert.present();
	}

	showPhoto(url) {
		this.photoViewer.show(url);
		
	}

}
