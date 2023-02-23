export class Controller {

  // public:
  constructor() {
    this.#apiKey = '995f2b66e783fb11b10fb5cea5c732e8';
    this.#apiCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.#apiForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    this.#getParams = 'undefined';
  }

  switchTab() {
    let today = $('#today-tab');
    let forecast = $('#forecast-tab');
    
    function toggleOn(button) {
      button.css({
        'pointer-events': 'none',
        'border-left-color': 'rgb(90, 88, 94)',
        'border-right-color': 'rgb(90, 88, 94)',
        'border-bottom-color': 'rgb(235, 77, 103)',
      });
    }

    function toggleOff(button) {
      button.css({
        'pointer-events': 'auto',
        'border-left-color': 'transparent',
        'border-right-color': 'transparent',
        'border-bottom-color': 'transparent'
      });
    }

    if (today.css('pointer-events') === 'none') {
      toggleOff(today);
      toggleOn(forecast);
    } else {
      toggleOff(forecast);
      toggleOn(today);
    }
  }

  getDataByCity(name) {
    return this.#getData('q=' + name);
  }

  getDataByCoordinates(latitude, longtitude) {
    return this.#getData(`lat=${latitude}&lon=${longtitude}`);
  }

  // private:
  #apiKey;
  #apiCurrentUrl;
  #apiForecastUrl;
  #getParams;

  #getData(locationParam) {
    this.#getParams = `?units=metric&${locationParam}&appid=${this.#apiKey}`;
    
    let queryCurrentUrl = this.#apiCurrentUrl + this.#getParams;
    let queryForecastUrl = this.#apiForecastUrl + this.#getParams;
    console.log(`queryCurrentUrl = ${queryCurrentUrl}`);
    console.log(`queryForecastUrl = ${queryForecastUrl}`);

    return true;
  }
}