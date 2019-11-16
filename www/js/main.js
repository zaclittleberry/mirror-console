const WeatherDay = await import('./elements/weather-day/weather-day.js');
const OpenweathermapService = await import('./services/openweathermap.service.js');

const weatherService = new OpenweathermapService();

class HomePage {
  days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  months = [
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

  forecastArray = [];
  forecastObject = {};
  display = '';

  constructor () {
    this.loadAndRenderDateAndTime();
    this.intervalDateTime = setInterval(() => {this.loadAndRenderDateAndTime();}, 15 * 1000);

    this.loadAndRenderForecast();
    this.intervalForecast = setInterval(() => {this.loadAndRenderForecast();}, 60 * 60 * 1000);

    this.toggleDisplays();
    this.intervalToggleDisplay = setInterval(() => {this.toggleDisplays()}, 15 * 1000);
  }

  async loadAndRenderForecast() {
    let forecasts = await weatherService.getForecast();
    let currentWeather = await weatherService.getWeather();

    for (let item of forecasts.list) {
      this.buildForecastObject(item);
    }
    this.forecastArray = this.forecastArray.filter((item, index) => index < 3 );

    this.forecastObject[this.forecastArray[0]].currentTemp = Math.round(currentWeather.main.temp);

    // Render
    let weatherElement = document.querySelector('#weather');
    while (weatherElement.lastChild) {
      weatherElement.removeChild(weatherElement.lastChild);
    }
    for (let day of this.forecastArray) {
      let weatherDay = this.forecastObject[day];
      let weatherDayElement = document.createElement("weather-day");
      weatherDayElement.setAttribute('day', weatherDay.day);
      weatherDayElement.setAttribute('conditions', weatherDay.conditions.join(', '));
      if (this.forecastObject[day].hasOwnProperty('currentTemp')) {
        weatherDayElement.setAttribute('current-temp', weatherDay.currentTemp);
      }
      weatherDayElement.setAttribute('low-temp', weatherDay.low);
      weatherDayElement.setAttribute('high-temp', weatherDay.high);

      weatherElement.appendChild(weatherDayElement);
    }

  }

  loadAndRenderDateAndTime() {
    let today = new Date();
    let dd = today.getDate();
    let d = today.getDay();
    let day = this.days[d];
    let mm = today.getMonth(); //January is 0!
    let month = this.months[mm];

    let yyyy = today.getFullYear();

    dd = this.zeroPad(dd);
    mm = this.zeroPad(mm);

    const dateText = day + ', ' + month + ' ' + dd + ', ' + yyyy;

    let h = today.getHours();
    let ampm = (h < 12) ? 'am' : 'pm';
    h = h % 12; // 12 hour format
    h = (h || 12); // set h to 12 if 0
    let m = today.getMinutes();
    // add a zero in front of numbers<10
    m = this.zeroPad(m);

    const timeText = h + ":" + m + ampm;

    // Set Date Element Text
    document.querySelector('#datetime .date').innerText = dateText;
    // Set Time Element Text
    document.querySelector('#datetime .time').innerText = timeText;
  }

  zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
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
    let dateElement = document.querySelector('#datetime');
    let weatherElement = document.querySelector('#weather');
    if (this.display == 'date') {
      dateElement.style.display = 'block';
      weatherElement.style.display = 'none';
    } else {
      dateElement.style.display = 'none';
      weatherElement.style.display = 'block';
    }
  }

}

new HomePage();
