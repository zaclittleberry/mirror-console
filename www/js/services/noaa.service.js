class NoaaService {

  constructor() {
    this.apiUrl = new URL('https://api.weather.gov/points');
  }

  getEndpoint(endpoint) {
    let url = new URL(this.apiUrl.href);
    // url.pathname += endpoint;
    // url.pathname += '/' + WEATHER_API_KEY;
    url.pathname += '/' + WEATHER_LOCATION;
    // url.searchParams.append('units', 'us');
    return url;
    // return '/weather';
  }

  async getForecast() {
    let url = this.getEndpoint('forecast');
    const response = await fetch(url);
    const results = await response.json();
    return results;
  }

  async getWeather() {
    let url = this.getEndpoint('forecast');
    const response = await fetch(url);
    const results = await response.json();
    return results;
  }

}
