import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class WundergroundService {
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
      apiUrl: 'https://api.wunderground.com/api',
    };
  }

  setUrl() : void {
    this.apiUrl = new URL(this.config.apiUrl);
    this.apiUrl.pathname += '/' + this.config.appId;
  }

  setConfig(config) : void {
    Object.assign(this.config, config);
    this.setUrl(); // refresh url after config update
  }

  setParams(url: URL) : URL {
    url = new URL(url.href);
    url.pathname += '/q';
    url.pathname += '/' + this.config.zip + '.json';
    return url;
  }

  getEndpoint(endpoint) : URL {
    let url = new URL(this.apiUrl.href);
    url.pathname += '/' + endpoint;
    return url;
  }

  getForecast() {
    let url = this.getEndpoint('forecast10day');
    url = this.setParams(url);
    return this.http.get(url.href).map(res => res.json());
  }

  getConditions() {
    let url = this.getEndpoint('conditions');
    url = this.setParams(url);
    return this.http.get(url.href).map(res => res.json());
  }

}
