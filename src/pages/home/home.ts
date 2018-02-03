import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
  interval: any;
  months: string[];
  days : string[];

  constructor(
    public navCtrl: NavController
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
    this.interval = setInterval(() => {this.updateDateTime()}, 15000);
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

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
