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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AboutPage } from '../about/about';
var DashboardPage = (function () {
    function DashboardPage(nav, navParams, viewCtrl) {
        this.nav = nav;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.chartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.chartLabels = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
        this.chartType = 'doughnut';
        this.chartLegend = true;
        this.chartData = [{
                data: [10, 90]
            }];
        this.case = navParams.data;
        this.loadProgress = 40;
        console.log(navParams);
        this.charts = [
            {
                title: "Realtime Crime Statistics",
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                type: 'line',
                datasets: [
                    {
                        label: "Victims rate",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            },
            {
                title: "Crime/Violence solved",
                labels: ["Howrah", "Bidhan Nagar", "Newtown", "Ruby", "Garia", "South Kolkata"],
                type: 'doughnut',
                datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            },
            {
                title: "Medical Cases solved",
                labels: ["Howrah", "Bidhan Nagar", "Newtown", "Ruby", "Garia", "South Kolkata"],
                type: 'bar',
                datasets: [{
                        label: 'Incidents solved',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
            }
        ];
    }
    DashboardPage.prototype.goToInboxPage = function () {
        this.nav.push(AboutPage);
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Component({
        templateUrl: 'dashboard.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ViewController])
], DashboardPage);
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map