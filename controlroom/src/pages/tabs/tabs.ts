import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { FinderPage } from '../finder/finder';
import { SummaryPage } from '../summary/summary';
import { DashboardPage } from '../dashboard/dashboard';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

declare var window:any;
declare var FCMPlugin;

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  // /*For victim*/
  // tab1Root = HomePage;
  // tab2Root = AboutPage;
  // tab3Root = DashboardPage;
  // tab4Root = FinderPage;

  // /*For control room*/
  tab1Root = SummaryPage;
  tab2Root = AboutPage;
  tab3Root = DashboardPage;
  tab4Root = DashboardPage;

  // /*For officer*/
  // tab1Root = AboutPage;
  // tab2Root = AboutPage;
  // tab3Root = AboutPage;
  // tab4Root = FinderPage;


  fireauth: any;
  cases: FirebaseListObservable<any>;
  firestore = firebase.database().ref('/pushtokens');
  firemsg = firebase.database().ref('/messages');

  constructor(public afd: AngularFireDatabase, public af: AngularFire) {

    this.fireauth = firebase.auth();
    console.log("Inside constructor");
    this.cases = af.database.list('/cases');
    console.log(this.cases);
    this.fireauth.signInWithEmailAndPassword("duttasubh2010@gmail.com", "India@123").then((res) => {
      console.log("logged in");
      
      this.tokensetup().then((token) => {
          this.storetoken(token);
      });
    });

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
  }
}