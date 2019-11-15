export class WeatherDay extends HTMLElement {
  /*
    <div class="weekday">
      ${this.getAttribute('day')}
    </div>
    <div class="conditions">
      ${this.getAttribute('conditions')}
    </div>
    <div class="current-conditions">
      ${this.getAttribute('current-temp')}°F
    </div>
    <div class="temps">
      <div class="low">
        ${this.getAttribute('low-temp')}°F
      </div>
      <div class="divider">
        -
      </div>
      <div class="high">
        ${this.getAttribute('high-temp')}°F
      </div>
    </div>
  */

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    const wrapper = document.createElement('div');
    if (this.hasAttribute('current-temp')) {
      wrapper.setAttribute('class', 'weather-day current');
    } else {
      wrapper.setAttribute('class', 'weather-day');
    }

    let day = document.createElement('div');
    day.setAttribute('class', 'weekday');

    let conditions = document.createElement('div');
    conditions.setAttribute('class', 'conditions');

    let currentTemp = document.createElement('div');
    currentTemp.setAttribute('class', 'current-temp');

    let temps = document.createElement('div');
    temps.setAttribute('class', 'temps');

    let low = document.createElement('low');
    low.setAttribute('class', 'low');

    let divider = document.createElement('div');
    divider.setAttribute('class', 'divider');
    divider.textContent = '-';

    let high = document.createElement('div');
    high.setAttribute('class', 'high');

    temps.appendChild(low);
    temps.appendChild(divider);
    temps.appendChild(high);

    wrapper.appendChild(day);
    wrapper.appendChild(conditions);
    wrapper.append(currentTemp);
    wrapper.append(temps);

    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', '/js/elements/weather-day/weather-day.css');
    // Attach the created element to the shadow dom
    shadow.appendChild(linkElem);
    shadow.appendChild(wrapper);
  }

  connectedCallback() {
    let shadow = this.shadowRoot;
    shadow.querySelector('.weekday').textContent = `${this.getAttribute('day')}`;
    shadow.querySelector('.conditions').textContent = `${this.getAttribute('conditions')}`;
    if (this.hasAttribute('current-temp')) {
      shadow.querySelector('.current-temp').textContent = `${this.getAttribute('current-temp')}°F`;
    } else {
      shadow.querySelector('.current-temp').remove();
    }
    shadow.querySelector('.low').textContent = `${this.getAttribute('low-temp')}°F`;
    shadow.querySelector('.high').textContent = `${this.getAttribute('high-temp')}°F`;
  }

}
customElements.define('weather-day', WeatherDay);
