/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */
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
import { NavController, LoadingController } from 'ionic-angular';
import { EmailPage } from '../email/email';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
var AboutPage = (function () {
    function AboutPage(nav, af, loadingCtrl) {
        var _this = this;
        this.nav = nav;
        this.af = af;
        this.loadingCtrl = loadingCtrl;
        this.casesFiled = [];
        this.fireauth = firebase.auth();
        console.log("Inside about constructor");
        this.cases = af.database.list('/cases');
        this.loader = this.loadingCtrl.create({
            content: 'Please..wait...!',
        });
        this.loader.present();
        this.cases.subscribe(function (data) {
            _this.casesFiled = data.reverse();
            console.log("List fetched");
            _this.loader.dismiss();
        }, function (ex) {
            console.log('Found exception: ', ex);
        });
    }
    AboutPage.prototype.goToEmailPage = function (data) {
        console.log(data);
        this.nav.push(EmailPage, data);
    };
    AboutPage.prototype.refreshPage = function (refresher) {
        var _this = this;
        this.cases.subscribe(function (data) {
            _this.casesFiled = data.reverse();
            console.log("List fetched");
            setTimeout(function () {
                refresher.complete();
            }, 2000);
        }, function (ex) {
            console.log('Found exception: ', ex);
        });
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Component({
        templateUrl: 'about.html'
    }),
    __metadata("design:paramtypes", [NavController, AngularFire, LoadingController])
], AboutPage);
export { AboutPage };
//# sourceMappingURL=about.js.map