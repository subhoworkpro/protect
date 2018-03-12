
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FinderPage } from '../pages/finder/finder';
import { SummaryPage } from '../pages/summary/summary';
import { AboutPage } from '../pages/about/about';
import { EmailPage } from '../pages/email/email';
import { ImagePage } from '../pages/image/image';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RideListPage } from '../pages/ride-list/ride-list';
import { TabsPage } from '../pages/tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

declare var FCMPlugin;

@Component({
  templateUrl: 'app.template.html',
})
export class TaxiApp {

  appPages: PageInterface[] = [
    {title: 'Home', component: HomePage, index: 1, icon: 'home'},
    {title: 'Find Help', component: ProfilePage, index: 2, icon: 'help-buoy'},
    {title: 'Police', component: AboutPage, index: 3, icon: 'heart'},
    {title: 'Dashboard', component: AboutPage, index: 4, icon: 'medical'},
    {title: 'Case Inbox', component: AboutPage, index: 5, icon: 'locate'},
  ];

  rootPage: any = TabsPage;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) private nav: Nav;

  constructor(private platform: Platform, public alertCtrl: AlertController,  
    private localNotifications: LocalNotifications) {

    if (this.platform.is('android')) {
      FCMPlugin.onNotification((data) => {
        console.log(data);
          if(data.wasTapped){
            //Notification was received on device tray and tapped by the user.
            if (data.sendername == 'controlroom') {
              let alert = this.alertCtrl.create({
                title: 'Emergency!',
                subTitle: data.message,
                buttons: ['OK']
              });
              this.nav.push(AboutPage);
              alert.present();
            }
          /*    if (data.sendername == 'victim') {
            this.nav.push(FinderPage);
          }else if(data.sendername == 'controlroom'){
            this.nav.push(AboutPage);
          }else if(data.sendername == 'officer'){
            this.nav.push(FinderPage);
          }*/
          

            // alert( JSON.stringify(data) );
          }else{
            //Notification was received in foreground. Maybe the user needs to be notified.
            // alert( JSON.stringify(data) );
         //    let alert = this.alertCtrl.create({
          //   title: 'Emergency!',
          //   subTitle: data.message,
          //   buttons: ['OK']
          // });

          // alert.present();
          if (data.sendername == 'controlroom') {
            this.localNotifications.schedule({
              title: "Emergency!",
              text: data.message,
              at: new Date(new Date().getTime() + 1 * 1000),
              sound: null
            });
            this.nav.push(AboutPage);
          }
             

          /*if (data.sendername == 'victim') {
            this.nav.push(FinderPage);
          }else if(data.sendername == 'controlroom'){
            this.nav.push(AboutPage);
          }else if(data.sendername == 'officer'){
            this.nav.push(FinderPage);
          }*/
          }
      });

    }

    // Call any initial plugins when ready
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // https://github.com/apache/cordova-plugin-inappbrowser
      // The cordova.InAppBrowser.open() function is defined to be a drop-in replacement for the window.open()
      // function. Existing window.open() calls can use the InAppBrowser window, by replacing window.open:
      if ((<any>window).cordova && (<any>window).cordova.InAppBrowser) {
        window.open = (<any>window).cordova.InAppBrowser.open;
      }
    });
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }
  }
}
