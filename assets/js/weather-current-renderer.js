import { Weather } from './models.js';


export class CurrentWeatherRenderer {
  
  static render(model) {
    let html = `
      <div class = "container" style = "color: white">CURRENT WEATHER</div>
      <div id = "parent">
        <div class = "col-4 child container" id = "desc" style = "color: white">${model.description}</div>
        <div class = "col-4 child" id = "tmp" >
          <h1 style = "color: white">${model.temperature}</h1>
          <h6 style = "color: white">Feels like ${model.feelsLike}</h6>
        </div>
        <div class = "col-3 child" id = "dayInf">
          <h6 style = "color: white">Sunrise: ${model.sunrise}</h6>
          <h6 style = "color: white">Sunset: ${model.sunset}</h6>
          <h6 style = "color: white">Duration: ${model.daytimeLength}</h6>
        </div>
      </div>
    `;
    return html;
  }
  
}
