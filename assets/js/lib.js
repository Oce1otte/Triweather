export class Controller {
  
  constructor() {
    this._apiKey = '995f2b66e783fb11b10fb5cea5c732e8';
    this._apiCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this._apiForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    this._cityName = 'Kyiv';
    this._getParams = 'undefined';
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

  getData() {
    this._getParams = `?units=metric&q=${this._cityName}&appid=${this._apiKey}`;
    let queryCurrentUrl = this._apiCurrentUrl + this._getParams;
    let queryForecastUrl = this._apiForecastUrl + this._getParams;
    console.log(`queryCurrentUrl = ${queryCurrentUrl}`);
    console.log(`queryForecastUrl = ${queryForecastUrl}`);
  }

}