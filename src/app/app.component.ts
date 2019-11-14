import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { WundergroundService } from '../services/wunderground.service';
import { OpenweathermapService } from '../services/openweathermap.service';
import { WEATHER_API_KEY, WEATHER_ZIP } from './constants';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    // private weatherService: WundergroundService,
    private weatherService: OpenweathermapService,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });

    this.weatherService.setConfig({
      'appId': WEATHER_API_KEY,
      'zip': WEATHER_ZIP,
    });

  }

  ngOnInit() {

  }
}
