import { Parser } from "./services.js";
import { CurrentWeatherRenderer } from "./weather-current-renderer.js";
import { ForecastWeatherRenderer } from "./weather-forecast-renderer.js";
import { HourlyWeatherRenderer } from "./weather-hourly-renderer.js";
import { NearbyWeatherRenderer } from "./weather-nearby-renderer.js";

export class Controller {

  // public:
  constructor() {
    this.#apiKey = '995f2b66e783fb11b10fb5cea5c732e8';
    this.#apiCurrentUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.#apiForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    this.#apiNearbyUrl = 'https://secure.geonames.org/findNearbyPlaceNameJSON?style=short&cities=cities15000&radius=300&maxRows=5&username=Triweather';
    this.#apiMediaUrl = 'http://openweathermap.org/img/w';
    this.#getParams = 'undefined';
    this.#validSearch = true;
    this.#parser = new Parser();
  }

  switchTab() {
    let todayTab = $('#today-tab');
    let forecastTab = $('#forecast-tab');
    let footer = $('footer');
    let footerContent = $('footer > div');
    let currentWeather = $('#weather-current');
    let forecastWeather = $('#weather-forecast');
    let nearbyWeather = $('#weather-nearby');

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

    if (forecastTab.css('pointer-events') === 'none') {
      toggleOff(forecastTab);
      toggleOn(todayTab);
      document.title = 'Triweather - Today';
      footer.fadeIn('fast');
      footerContent.show('drop', {direction: 'down'}, 'fast');
      if (this.#validSearch) {
        forecastWeather.hide('drop', {direction: 'right'}, 'fast');
        currentWeather.show('drop', {direction: 'left'}, 'fast');
        nearbyWeather.show('drop', {direction: 'left'}, 'fast');
      }
    } else {
      toggleOff(todayTab);
      toggleOn(forecastTab);
      document.title = 'Triweather - 5-day forecast';
      footerContent.hide('drop', {direction: 'down'}, 'fast');
      footer.fadeOut('fast');
      if (this.#validSearch) {
        currentWeather.hide('drop', {direction: 'left'}, 'fast');
        nearbyWeather.hide('drop', {direction: 'left'}, 'fast');
        forecastWeather.show('drop', {direction: 'right'}, 'fast');
      }
    }
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
  #apiMediaUrl;
  #getParams;
  #validSearch;
  #parser;

  async #getData(locationParam) {
    let currentWeather = $('#weather-current');
    let forecastWeather = $('#weather-forecast');
    let hourlyWeather = $('#weather-hourly');
    let nearbyWeather = $('#weather-nearby');
    let searchError = $('#weather-notfound');
    let search = $('#search input');
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
      this.#loadNearby(currentWeatherData.coord.lat, currentWeatherData.coord.lon);
      this.#parser.dataTransit(currentWeatherData, forecastWeatherData, this.#apiMediaUrl);
      let model = this.#parser.getModel();

      currentWeather.html(CurrentWeatherRenderer.render(model));
      forecastWeather.html(ForecastWeatherRenderer.render(model));
      hourlyWeather.html(HourlyWeatherRenderer.render(model));
      $('#search input').attr('placeholder', model.name + ', ' + model.country);

      searchError.fadeOut('fast');
      if($('#forecast-tab').css('pointer-events') === 'none')
      {
        hourlyWeather.show('drop', {direction: 'up'}, 'fast');
        forecastWeather.show('drop', {direction: 'up'}, 'fast');
      } else {
        hourlyWeather.show('drop', {direction: 'up'}, 'fast');
        currentWeather.show('drop', {direction: 'up'}, 'fast');
      }
    } else {
      currentWeather.hide('drop', {direction: 'up'}, 'fast');
      forecastWeather.hide('drop', {direction: 'up'}, 'fast');
      hourlyWeather.hide('drop', {direction: 'up'}, 'fast');
      nearbyWeather.hide('drop', {direction: 'up'}, 'fast');
      $('#weather-notfound > h3').html(`"${search.val()}" could not be found`);
      searchError.show('drop', {direction: 'down'}, 'fast');
    }
    search.val('');
    return this.#validSearch;
  }

  async #loadNearby(latitude, longtitude) {
    let nearbyWeather = $('#weather-nearby');
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

    this.#parser.dataTransitNearby(nearbyWeatherData, this.#apiMediaUrl);
    let model = this.#parser.getModel();
    nearbyWeather.html(NearbyWeatherRenderer.render(model));
    if($('#forecast-tab').css('pointer-events') !== 'none')
      nearbyWeather.show('drop', {direction: 'down'}, 'fast');
  }

}