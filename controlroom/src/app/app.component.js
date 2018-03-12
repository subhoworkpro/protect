var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { FinderPage } from '../pages/finder/finder';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';
var TaxiApp = (function () {
    function TaxiApp(platform, alertCtrl, localNotifications) {
        var _this = this;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.localNotifications = localNotifications;
        this.appPages = [
            { title: 'Home', component: HomePage, index: 1, icon: 'home' },
            { title: 'Find Help', component: ProfilePage, index: 2, icon: 'help-buoy' },
            { title: 'Police', component: AboutPage, index: 3, icon: 'heart' },
            { title: 'Dashboard', component: AboutPage, index: 4, icon: 'medical' },
            { title: 'Case Inbox', component: AboutPage, index: 5, icon: 'locate' },
        ];
        this.rootPage = TabsPage;
        if (this.platform.is('android')) {
            FCMPlugin.onNotification(function (data) {
                console.log(data);
                if (data.wasTapped) {
                    //Notification was received on device tray and tapped by the user.
                    if (data.sendername == 'officer') {
                        var alert_1 = _this.alertCtrl.create({
                            title: 'Emergency!',
                            subTitle: data.message,
                            buttons: ['OK']
                        });
                        _this.nav.push(FinderPage);
                        alert_1.present();
                    }
                    /*    if (data.sendername == 'victim') {
                      this.nav.push(FinderPage);
                    }else if(data.sendername == 'controlroom'){
                      this.nav.push(AboutPage);
                    }else if(data.sendername == 'officer'){
                      this.nav.push(FinderPage);
                    }*/
                    // alert( JSON.stringify(data) );
                }
                else {
                    //Notification was received in foreground. Maybe the user needs to be notified.
                    // alert( JSON.stringify(data) );
                    //    let alert = this.alertCtrl.create({
                    //   title: 'Emergency!',
                    //   subTitle: data.message,
                    //   buttons: ['OK']
                    // });
                    // alert.present();
                    if (data.sendername == 'officer') {
                        _this.localNotifications.schedule({
                            title: "Emergency!",
                            text: data.message,
                            at: new Date(new Date().getTime() + 1 * 1000),
                            sound: null
                        });
                        _this.nav.push(FinderPage);
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
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            // https://github.com/apache/cordova-plugin-inappbrowser
            // The cordova.InAppBrowser.open() function is defined to be a drop-in replacement for the window.open()
            // function. Existing window.open() calls can use the InAppBrowser window, by replacing window.open:
            if (window.cordova && window.cordova.InAppBrowser) {
                window.open = window.cordova.InAppBrowser.open;
            }
        });
    }
    TaxiApp.prototype.openPage = function (page) {
        // the nav component was found using @ViewChild(Nav)
        // reset the nav to remove previous pages and only have this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, { tabIndex: page.index });
        }
        else {
            this.nav.setRoot(page.component).catch(function () {
                console.log("Didn't set nav root");
            });
        }
    };
    return TaxiApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], TaxiApp.prototype, "nav", void 0);
TaxiApp = __decorate([
    Component({
        templateUrl: 'app.template.html',
    }),
    __metadata("design:paramtypes", [Platform, AlertController,
        LocalNotifications])
], TaxiApp);
export { TaxiApp };
//# sourceMappingURL=app.component.js.map