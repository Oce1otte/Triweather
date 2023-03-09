import { Parser } from "./services.js";
import { CurrentWeatherRenderer } from "./weather-current-renderer.js";
import { ForecastWeatherRenderer } from "./weather-forecast-renderer.js";
import { HourlyWeatherRenderer } from "./weather-hourly-renderer.js";
import { NearbyWeatherRenderer } from "./weather-nearby-renderer.js";

let todayTab = $('#today-tab');
let forecastTab = $('#forecast-tab');
let footer = $('footer');
let footerContent = $('footer > div');
let currentWeather = $('#weather-current');
let forecastWeather = $('#weather-forecast');
let hourlyWeather = $('#weather-hourly');
let nearbyWeather = $('#weather-nearby');
let searchError = $('#weather-notfound');
let search = $('#search input');

export class Controller {

  // public:
  constructor() {
    this.#apiKey = '995f2b66e783fb11b10fb5cea5c732e8';
    this.#apiCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.#apiForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    this.#apiNearbyUrl = 'https://secure.geonames.org/findNearbyPlaceNameJSON?style=short&cities=cities15000&radius=300&maxRows=5&username=Triweather';
    this.#mediaUrl = 'assets/img/weather_icons';
    this.#getParams = 'undefined';
    this.#validSearch = true;
    this.#parser = new Parser();
  }

  setForecastDay(index) {
    if (index < 1 || index > 5)
      index = 1;
    for (let i = 1; i <= 5; i++)
      if (i !== index ) {
        $(`#day-${i}-btn`).css({
          'pointer-events': 'auto',
          'background-color': 'rgb(48, 58, 77)'
        });
        $(`#day-${i}-form`).css('display', 'none');
      }
    $(`#day-${index}-btn`).css({
      'pointer-events': 'none',
      'background-color': 'rgb(80, 96, 128)'
    });
    $(`#day-${index}-form`).css('display', 'block');
  }

  switchTab() {
    if (forecastTab.css('pointer-events') === 'none') {
      this.#toggleOff(forecastTab);
      this.#toggleOn(todayTab);
      document.title = 'Triweather - Today';
      if (this.#validSearch) {
        forecastWeather.hide('drop', {direction: 'left'}, 'fast').promise().done(() => {
          currentWeather.show('drop', {direction: 'left'}, 'fast').promise().done(() => {
            nearbyWeather.show('drop', {direction: 'down'}, 'fast');
          });
        });
       
      }
      footer.fadeIn('fast');
      footerContent.show('drop', {direction: 'down'}, 'fast');
    } else {
      this.#toggleOff(todayTab);
      this.#toggleOn(forecastTab);
      document.title = 'Triweather - 5-day forecast';
      footerContent.hide('drop', {direction: 'down'}, 'fast');
      footer.fadeOut('fast');
      if (this.#validSearch) {
        nearbyWeather.hide('drop', {direction: 'down'}, 'fast');
        currentWeather.hide('drop', {direction: 'left'}, 'fast').promise().done(() => {
          forecastWeather.show('drop', {direction: 'left'}, 'fast').promise().done(() => {
            forecastWeather.css('display', 'flex');
          });
        });
      }
    }
    this.setForecastDay(1);
  }

  getDataByCity(name) {
    this.#getData('q=' + name);
  }

  getDataByCoordinates(latitude, longtitude) {
    this.#getData(`lat=${latitude}&lon=${longtitude}`);
  }

  // private:
  #apiKey;
  #apiCurrentUrl;
  #apiForecastUrl;
  #apiNearbyUrl;
  #mediaUrl;
  #getParams;
  #validSearch;
  #parser;

  #toggleOn(button) {
    button.css({
      'pointer-events': 'none',
      'border-left-color': 'rgb(90, 88, 94)',
      'border-right-color': 'rgb(90, 88, 94)',
      'border-bottom-color': 'rgb(235, 77, 103)',
    });
  }

  #toggleOff(button) {
    button.css({
      'pointer-events': 'auto',
      'border-left-color': 'transparent',
      'border-right-color': 'transparent',
      'border-bottom-color': 'transparent'
    });
  }

  async #getData(locationParam) {
    let wasValid = this.#validSearch;
    let currentWeatherData, forecastWeatherData;
    this.#getParams = `?units=metric&${locationParam}&appid=${this.#apiKey}`;
    try {
      await $.getJSON(this.#apiCurrentUrl + this.#getParams, (currentData) => {
        currentWeatherData = currentData;
        this.#validSearch = true;
      }).error(() => {
        this.#validSearch = false;
      });
      await $.getJSON(this.#apiForecastUrl + this.#getParams, (forecastData) => {
        forecastWeatherData = forecastData;
      }).error(() => {
        this.#validSearch = false;
      });
    } catch(e) {}
    if (this.#validSearch) {
      searchError.hide('drop', {direction: 'down'}, 'fast').promise().done(() => {
        this.#loadNearby(currentWeatherData.coord.lat, currentWeatherData.coord.lon);
        this.#parser.dataTransit(currentWeatherData, forecastWeatherData, this.#mediaUrl);
        let model = this.#parser.getModel();
        currentWeather.html(CurrentWeatherRenderer.render(model));
        forecastWeather.html(ForecastWeatherRenderer.render(model));
        hourlyWeather.html(HourlyWeatherRenderer.render(model));
        search.attr('placeholder', model.name + ', ' + model.country);
        this.setForecastDay(1);
        if(todayTab.css('pointer-events') === 'none') {
          hourlyWeather.fadeIn('fast');
          currentWeather.show('drop', {direction: 'left'}, 'fast');
        } else {
          hourlyWeather.fadeIn('fast');
          forecastWeather.show('drop', {direction: 'left'}, 'fast');
        }
      });
    } else {
      $('#weather-notfound > h3').html(`"${search.val()}" could not be found`);
      if (wasValid) {
        if(todayTab.css('pointer-events') === 'none') {
          currentWeather.fadeOut('fast');
          hourlyWeather.fadeOut('fast');
          nearbyWeather.hide('drop', {direction: 'up'}, 'fast').promise().done(() => {
            searchError.show('drop', {direction: 'down'}, 'fast');
          });
        } else {
          forecastWeather.fadeOut('fast');
          hourlyWeather.fadeOut('fast').promise().done(() => {
            searchError.show('drop', {direction: 'down'}, 'fast');
          });
        }
      }
    }
    search.val('');
    return this.#validSearch;
  }

  async #loadNearby(latitude, longtitude) {
    let nearbyWeatherData = [];
    try {
      await $.getJSON(this.#apiNearbyUrl +`&lat=${latitude}&lng=${longtitude}`, (nearbyData) => {
        nearbyWeatherData = nearbyData;
        nearbyWeatherData.geonames.splice(0, 1);
      }).error(() => {});
      let temp = [];
      for (let city of nearbyWeatherData.geonames)
        await $.getJSON(this.#apiCurrentUrl + `?q=${city.name}&units=metric&appid=${this.#apiKey}`, (nearbyData) => {
          temp.push(nearbyData);
        }).error(() => {});
      nearbyWeatherData = temp;
    } catch(e) {}
    this.#parser.dataTransitNearby(nearbyWeatherData, this.#mediaUrl);
    nearbyWeather.html(NearbyWeatherRenderer.render(this.#parser.getModel()));
    if(todayTab.css('pointer-events') === 'none')
      nearbyWeather.show('drop', {direction: 'down'}, 'fast');
  }

}