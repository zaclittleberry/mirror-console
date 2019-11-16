class OpenweathermapService {

  constructor() {
    this.apiUrl = new URL('https://api.openweathermap.org/data/2.5');
  }

  getEndpoint(endpoint) {
    let url = new URL(this.apiUrl.href);
    url.pathname += '/' + endpoint;
    url.searchParams.append('zip', WEATHER_ZIP);
    url.searchParams.append('appid', WEATHER_API_KEY);
    url.searchParams.append('units', 'imperial');
    return url;
  }

  async getForecast() {
    let url = this.getEndpoint('forecast');
    const response = await fetch(url);
    const results = await response.json();
    return results;
  }

  async getWeather() {
    let url = this.getEndpoint('weather');
    const response = await fetch(url);
    const results = await response.json();
    return results;
  }

}
