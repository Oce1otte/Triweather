import { Nearby, Hourly, Forecast, Weather } from './models.js';


const dayNames = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
const dayShortNames = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const monthNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const directionNames = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];

export class Parser {

  // public:
  constructor() {
    this.#model = new Weather();
  }

  getModel() {
    return this.#model;
  }

  dataTransit(currentData, forecastData, mediaUrl) {
    let model = this.#model;

    // Current:
    let duration = new Date((currentData.sys.sunset - currentData.sys.sunrise) * 1000);
    model.name = currentData.name;
    model.country = new Intl.DisplayNames(['en'], {type: 'region'}).of(currentData.sys.country);
    model.date = new Date(currentData.dt * 1000).toLocaleDateString('ru-RU');
    model.iconUrl = mediaUrl + `/${currentData.weather[0].icon}.png`
    model.desc = currentData.weather[0].main;
    model.temp = currentData.main.temp;
    model.feelsLike = currentData.main.feels_like;
    model.sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    model.sunset = new Date(currentData.sys.sunset  * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    model.dayLength = `${duration.getHours()}:${duration.getMinutes()}`;

    // Forecast:
    model.forecast = [];
    let forecastDayEnd = Math.floor(new Date(new Date(currentData.dt * 1000).toLocaleDateString()).getTime() / 1000);
    let todayForecastName = currentData.dt < (forecastDayEnd + 64800) ? 'TODAY' : 'TONIGHT';
    let n, i = -1;
    for (let hour of forecastData.list) {
      if (hour.dt > forecastDayEnd) {
        i++;
        n = 0;
        model.forecast.push(new Forecast());
        let day = new Date(forecastDayEnd * 1000);
        model.forecast[i].day = dayNames[day.getDay()];
        model.forecast[i].dayShort = dayShortNames[day.getDay()];
        model.forecast[i].date = `${monthNames[day.getMonth()]} ${("0" + day.getDate()).slice(-2)}`;
        forecastDayEnd += 86400;
      }
      model.forecast[i].hourly.push(new Hourly());
      let modelHour = model.forecast[i].hourly[n];
      modelHour.time = new Date(hour.dt * 1000).toLocaleTimeString('en-US', {hour: 'numeric'});
      modelHour.iconUrl = mediaUrl + `/${hour.weather[0].icon}.png`;
      modelHour.desc = hour.weather[0].main;  
      modelHour.temp = hour.main.temp;
      modelHour.feelsLike = hour.main.feels_like;  
      modelHour.windSpeed = Math.ceil(hour.wind.speed);
      modelHour.windDir = directionNames[Math.floor((hour.wind.deg / 22.5) + 0.5) % 16];
      if (modelHour.time === model.forecast[0].hourly[0].time) {
        model.forecast[i].iconUrl = modelHour.iconUrl;
        model.forecast[i].temp = modelHour.temp;
        model.forecast[i].desc = hour.weather[0].description;
      }
      n++;
    }
    model.forecast[0].day = todayForecastName;
    model.forecast[0].dayShort = todayForecastName;
  }

  dataTransitNearby(nearbyWeatherData, mediaUrl) {
    let model = this.#model;

    // Nearby:
    let i = 0;
    model.nearby = [];
    for (let city of nearbyWeatherData) {
      model.nearby.push(new Nearby());
      model.nearby[i].name = city.name;
      model.nearby[i].iconUrl =  mediaUrl + `/${city.weather[0].icon}.png`;
      model.nearby[i].temp = city.main.temp;
      i++;
    }
    console.log(this.#model);
  }

  // private:
  #model;
}