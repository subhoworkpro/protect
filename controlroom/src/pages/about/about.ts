/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { EmailPage } from '../email/email';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
  templateUrl: 'about.html'
})
export class AboutPage {

	fireauth: any;
	cases: FirebaseListObservable<any>;
	casesFiled: Array<any> = [];
	loader: any;
	constructor( private nav: NavController, public af: AngularFire, private loadingCtrl: LoadingController ) {
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
	}

	goToEmailPage(data) {
		console.log(data);
		this.nav.push(EmailPage, data);
	}

	refreshPage(refresher) {
		this.cases.subscribe(data => {
			this.casesFiled = data.reverse();
			console.log("List fetched");
			setTimeout(() => {
		      refresher.complete();
		    }, 2000);
		},
		(ex) => {
			console.log('Found exception: ', ex);
		});
	}
}
