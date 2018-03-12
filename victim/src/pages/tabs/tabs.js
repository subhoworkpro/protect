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
import { AboutPage } from '../about/about';
import { FinderPage } from '../finder/finder';
var TabsPage = (function () {
    function TabsPage() {
        // /*For victim*/
        // tab1Root = HomePage;
        // tab2Root = AboutPage;
        // tab3Root = DashboardPage;
        // tab4Root = FinderPage;
        // /*For control room*/
        // tab1Root = HomePage;
        // tab2Root = AboutPage;
        // tab3Root = DashboardPage;
        // tab4Root = FinderPage;
        /*For officer*/
        this.tab1Root = AboutPage;
        this.tab2Root = AboutPage;
        this.tab3Root = AboutPage;
        this.tab4Root = FinderPage;
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html'
    }),
    __metadata("design:paramtypes", [])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map