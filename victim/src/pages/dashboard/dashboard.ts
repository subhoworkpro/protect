import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

	chartOptions: any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	chartLabels: string[] = ['Test 1', 'Test 2', 'Test 3', 'Test 4'];
	chartType: string = 'doughnut';
	chartLegend: boolean = true;

	chartData: any[] = [{
        data: [10, 90]
    }];	
	charts: any[];
	loadProgress: any;
	case: any;
	constructor(private nav: NavController, public navParams: NavParams, public viewCtrl: ViewController ) {
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
	goToInboxPage(): void {
		this.nav.push(AboutPage);
	}

}
