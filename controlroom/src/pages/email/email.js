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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { FinderPage } from '../finder/finder';
import { AngularFire } from 'angularfire2';
import firebase from 'firebase';
var EmailPage = (function () {
    function EmailPage(nav, navParams, af, alertCtrl) {
        this.nav = nav;
        this.navParams = navParams;
        this.af = af;
        this.alertCtrl = alertCtrl;
        this.case = navParams.data;
        this.fireauth = firebase.auth();
        this.cases = af.database.list('/cases');
        console.log(navParams);
    }
    EmailPage.prototype.goToSearchPage = function () {
        this.nav.push(SearchPage);
    };
    EmailPage.prototype.goToFinderPage = function () {
        this.nav.push(FinderPage);
    };
    EmailPage.prototype.cancel = function () {
        this.nav.pop();
    };
    EmailPage.prototype.fileGD = function (data) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: "GD Filed successfully.",
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        _this.cases.update(data.$key, { status: "FIR FILED" });
                        _this.nav.pop();
                    }
                }]
        });
        alert.present();
    };
    EmailPage.prototype.fileFIR = function (data) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: "FIR Filed successfully.",
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        _this.cases.update(data.$key, { status: "FIR FILED" });
                        _this.nav.pop();
                    }
                }]
        });
        alert.present();
    };
    return EmailPage;
}());
EmailPage = __decorate([
    Component({
        templateUrl: 'email.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AngularFire, AlertController])
], EmailPage);
export { EmailPage };
//# sourceMappingURL=email.js.map