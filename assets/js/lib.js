export class Controller {
  
  constructor() {
    this._apiKey = '995f2b66e783fb11b10fb5cea5c732e8';
    this._apiCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this._apiForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    this._cityName = 'Kyiv';
    this._getParams = 'undefined';
  }

  getData() {
    this._getParams = `?units=metric&q=${this._cityName}&appid=${this._apiKey}`;
    let queryCurrentUrl = this._apiCurrentUrl + this._getParams;
    let queryForecastUrl = this._apiForecastUrl + this._getParams;
    console.log(`queryCurrentUrl = ${queryCurrentUrl}`);
    console.log(`queryForecastUrl = ${queryForecastUrl}`);
  }

}