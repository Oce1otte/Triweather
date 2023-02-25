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
    //for (let i = 0; i < 5; i++)
    //{
    //  this.#model.push([]);
   //   for (let n = 0; n < 5; n++)
    //    this.#model[i].push(new Hourly())
   // }dt
    //let current = this.#model.current;

    //current.date = currentData.dt;
    //current.icon = currentData.weather[0].icon;
    //current.description = currentData.weather[0].main;
    //current.temp_c = currentData.main.temp;
    //current.feels_like = currentData.main.feels_like;
    //current.sunrise = currentData.sys.sunrise;
    //current.sunset = currentData.sys.sunset;

    //this._model.name = responseData.location.name;
    //this._model.region = responseData.location.region;
    //this._model.country = responseData.location.country;
    //this._model.localtime = //responseData.location.localtime;
    //this._model.temp_c = responseData.current.temp_c;
  
    //this._model.text = responseData.current.condition.text;
    //this._model.icon = `https:${responseData.current.condition.icon}`;
    //this._model.wind_kph = responseData.current.wind_kph;
   // this._model.wind_dir = responseData.current.wind_dir;
    //this._model.vis_km = responseData.current.vis_km;

    console.log(this.#model);
  }

  // private:
  #model;
}