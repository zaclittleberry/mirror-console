class WttrinService {

  constructor() {
  }

  getEndpoint() {
    return '/weather';
  }

  async getForecast() {
    let url = this.getEndpoint();
    const response = await fetch(url);
    const results = await response.json();
    return results.current_condition[0];
  }

  async getWeather() {
    let url = this.getEndpoint();
    const response = await fetch(url);
    // const results = await response.json().weather;
    const results = await response.json();
    return results;
  }

}
