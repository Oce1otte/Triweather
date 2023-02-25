import { Weather } from './models.js';

export class Parser {

  // public:
  constructor() {
    this.#model = new Weather();
  }

  getModel() {
    return this.#model;
  }

  dataTransit(currentData, forecastData) {
    let model = this.#model;
    
    model.name = currentData.name;
    model.country = new Intl.DisplayNames(['en'], {type: 'region'}).of(currentData.sys.country);
    model.date = new Date(currentData.dt * 1000).toLocaleDateString('ru-RU');
    model.description = currentData.weather[0].main;
    model.temperature = currentData.main.temp;
    model.feelsLike = currentData.main.feels_like;
    model.sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    model.sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    let duration = new Date((currentData.sys.sunset - currentData.sys.sunrise) * 1000);
    model.daytimeLength =  `${duration.getHours()}:${duration.getMinutes()}`;

    console.log(this.#model);
  }

  // private:
  #model;
}