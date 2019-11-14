import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class OpenweathermapService {
  apiUrl: URL;
  appId: string = '';
  config: any;

  constructor(
    private http: Http
  ) {
    this.getDefaults();
    this.setUrl();
  }

  getDefaults() {
    this.config = {
      appId: '',
      zip: '',
      apiUrl: 'https://api.openweathermap.org/data/2.5',
    };
  }

  setUrl() : void {
    this.apiUrl = new URL(this.config.apiUrl);
  }

  setConfig(config) : void {
    Object.assign(this.config, config);
    this.setUrl(); // refresh url after config update
  }

  setParams(url: URL) : URL {
    url = new URL(url.href);
    url.searchParams.append('zip', this.config.zip);
    url.searchParams.append('appid', this.config.appId);
    url.searchParams.append('units', 'imperial');
    return url;
  }

  getEndpoint(endpoint) : URL {
    let url = new URL(this.apiUrl.href);
    url.pathname += '/' + endpoint;
    return url;
  }

  getForecast() {
    let url = this.getEndpoint('forecast');
    url = this.setParams(url);
    return this.http.get(url.href).map(res => res.json());
  }

  getConditions() {
    let url = this.getEndpoint('weather');
    url = this.setParams(url);
    return this.http.get(url.href).map(res => res.json());
  }

}
