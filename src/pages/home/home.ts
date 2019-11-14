import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { WundergroundService } from '../../services/wunderground.service';
import { OpenweathermapService } from '../../services/openweathermap.service';

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
  // forecast: any;
  forecastObject: any;
  forecastArray: any;
  conditions: any;
  display: string;


  constructor(
    public navCtrl: NavController,
    // private weatherService: WundergroundService,
    private weatherService: OpenweathermapService,
  ) {
    this.forecastObject = {};
    this.forecastArray = [];
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
      for (let item of response.list) {
        this.buildForecastObject(item);
      }
      this.forecastArray = this.forecastArray.filter((item, index) => index < 3 );
    });
    this.weatherService.getConditions().subscribe(response => {
      let date = new Date(response.dt)
      this.conditions = response;
    });

  }

  buildForecastObject(item) {
    let day = this.dateTimeGetDay(item.dt*1000);
    if (!this.forecastObject.hasOwnProperty(day)) {
      this.forecastArray.push(day);
      this.forecastObject[day] = {
        day: day,
        low: Math.round(item.main.temp),
        high: Math.round(item.main.temp),
        conditions: [],
      };
    }
    if (item.main.temp < this.forecastObject[day].low) {
      this.forecastObject[day].low = Math.round(item.main.temp);
    } else if (item.main.temp > this.forecastObject[day].high) {
      this.forecastObject[day].high = Math.round(item.main.temp);
    }
    let conditions = this.forecastObject[day].conditions;
    let lastCondition = conditions[conditions.length-1];
    let currentCondition = item.weather[0].main;
    if (currentCondition !== lastCondition) {
      this.forecastObject[day].conditions.push(item.weather[0].main);
    }
  }

  dateTimeGetDay(datetime) {
    let date = new Date(datetime);
    return this.days[date.getDay()];
  }

  toggleDisplays() {
    this.display = (this.display == 'date') ? 'weather' : 'date';
  }

}
