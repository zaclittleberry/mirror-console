import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WundergroundService } from '../../services/wunderground.service';

@IonicPage({
  name: 'HomePage',
  segment: 'home',
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  date: string;
  time: string;
  intervalDateTime: any;
  intervalForecast: any;
  intervalToggleDisplay: any;
  months: string[];
  days : string[];
  forecast: any;
  display: string;


  constructor(
    public navCtrl: NavController,
    private weatherService: WundergroundService,
  ) {
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    this.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  }

  ngOnInit() {
    this.updateDateTime();
    this.intervalDateTime = setInterval(() => {this.updateDateTime()}, 15 * 1000);

    this.getForecast();
    this.intervalForecast = setInterval(() => {this.getForecast()}, 60 * 60 * 1000);

    this.toggleDisplays();
    this.intervalToggleDisplay = setInterval(() => {this.toggleDisplays()}, 15 * 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalDateTime);
    clearInterval(this.intervalForecast);
    clearInterval(this.intervalToggleDisplay);
  }

  updateDateTime() {
    let today = new Date();
    let dd = today.getDate();
    let d = today.getDay();
    let day = this.days[d];
    let mm = today.getMonth(); //January is 0!
    let month = this.months[mm];

    let yyyy = today.getFullYear();

    dd = this.zeroPad(dd);
    mm = this.zeroPad(mm);

    this.date = day + ', ' + month + ' ' + dd + ', ' + yyyy;

    let h = today.getHours();
    let ampm = (h < 12) ? 'am' : 'pm';
    h = h % 12; // 12 hour format
    h = (h || 12); // set h to 12 if 0
    let m = today.getMinutes();
    // add a zero in front of numbers<10
    m = this.zeroPad(m);
    this.time = h + ":" + m + ampm;
  }

  zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  getForecast() {
    this.weatherService.getForecast().subscribe(response => {
      this.forecast = response.forecast.simpleforecast.forecastday.filter((item, index) => index < 5 );
    });
  }

  toggleDisplays() {
    this.display = (this.display == 'date') ? 'weather' : 'date';
  }

}
