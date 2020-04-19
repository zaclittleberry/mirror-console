// const weatherService = new DarkskyService();
// const weatherService = new NoaaService();
const weatherService = new WttrinService();

class HomePage {
  constructor () {
    this.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

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

    this.forecastArray = [];
    this.forecastObject = {};
    this.display = '';

    this.loadAndRenderDateAndTime();
    this.intervalDateTime = setInterval(() => {this.loadAndRenderDateAndTime();}, 15 * 1000);

    this.loadAndRenderForecast();
    this.intervalForecast = setInterval(() => {this.loadAndRenderForecast();}, 60 * 60 * 1000);

    this.toggleDisplays();
    this.intervalToggleDisplay = setInterval(() => {this.toggleDisplays()}, 15 * 1000);
  }

  async loadAndRenderForecast() {
    let weather = await weatherService.getWeather();

    let currentWeather = weather.current_condition[0];
    console.log(currentWeather);

    let forecasts = weather.weather;
    console.log(forecasts);

    // Clear forecast properties to rebuild them
    this.forecastArray = [];
    this.forecastObject = {};
    for (let item of forecasts) {
      console.log(item);
      this.buildForecastObject(item);
    }

    this.forecastObject[this.forecastArray[0]].currentTemp = Math.round(currentWeather.temp_F);

    // Render
    let weatherElement = document.querySelector('#weather');
    while (weatherElement.lastChild) {
      weatherElement.removeChild(weatherElement.lastChild);
    }
    for (let day of this.forecastArray) {
      let weatherDay = this.forecastObject[day];
      let weatherDayElement = document.createElement("weather-day");
      weatherDayElement.setAttribute('day', weatherDay.day);
      weatherDayElement.setAttribute('conditions', weatherDay.conditions.join(';'));
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
    let m = today.getMinutes();
    let timeText = this.formatTime(h, m)

    // Set Date Element Text
    document.querySelector('#datetime .date').innerText = dateText;
    // Set Time Element Text
    document.querySelector('#datetime .time').innerText = timeText;
  }

  formatTime(h, m = undefined) {
    console.log(typeof h, h);
    let ampm = (h < 12) ? 'am' : 'pm';
    h = h % 12; // 12 hour format
    h = (h || 12); // set h to 12 if 0
    // add a zero in front of numbers<10

    if (m!== undefined) {
      m = this.zeroPad(m);
      return h + ":" + m + ampm;
    } else {
      return h + ampm;
    }
  }

  zeroPad(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  buildForecastObject(item) {
    console.log(item.date);
    let date = item.date.replace(/-/g, '/');
    const dateUnix = Date.parse(date);
    let day = this.dateTimeGetDay(dateUnix);
    console.log(day);
    if (!this.forecastObject.hasOwnProperty(day)) {
      this.forecastArray.push(day);
      this.forecastObject[day] = {
        day: day,
        low: item.mintempF,
        high: item.maxtempF,
        conditions: [],
      };
    }
    //  item.hourly[3-6].weatherDesc[0].value
    for (let i = 3; i<=7; i++) {
      let conditions = this.forecastObject[day].conditions;
      // let lastCondition = conditions[conditions.length-1];
      let hourly = item.hourly[i];
      let currentCondition = hourly.weatherDesc[0].value;
      // time is in military format: eg 600. multiply by .01 for 1-24 houra
      let hourlyTime = parseFloat(hourly.time) * .01;
      let currentTime = this.formatTime(hourlyTime);
      this.forecastObject[day].conditions.push(`${currentTime}: ${currentCondition}`);

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
