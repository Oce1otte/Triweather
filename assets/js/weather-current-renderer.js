import { Weather } from './models.js';


export class CurrentWeatherRenderer {
  
  static render(model) {
    let html = `
    <div id = "parent" class = "row">
      <div class = "col-sm-8 container" id = "desc" style = "color: white">
        <h5 style = "color:rgb(200, 50, 50); font-family: Georgia, 'Times New Roman', Times, serif">CURRENT WEATHER</h5>
      </div>
      <div class = "col-4" id = "dayInf">
        <h5 style = "color: rgb(200, 50, 50); font-family: Georgia, 'Times New Roman', Times, serif">${model.date}</h5>
      </div>
    </div>
      <div id = "parent" class = "row">
        <div class = "col-3 container">
          <img src="${model.iconUrl}"></img>
          <h6 style = "color: rgb(243, 243, 243);">${model.desc}</h6>
        </div>
        <div class = "col-8 col-sm-4" id = "tmp" >
          <h1 style = "color: rgb(243, 243, 243);">${model.temp}°C</h1>
          <h6 style = "color:rgb(172, 165, 167);">Feels like: ${model.feelsLike}°C</h6>
        </div>
        <div class = "col-4" id = "dayInf">
          <h6 style = "color: rgb(243, 243, 243);">Sunrise: ${model.sunrise}</h6>
          <h6 style = "color: rgb(243, 243, 243);">Sunset: ${model.sunset}</h6>
          <h6 style = "color: rgb(243, 243, 243);">Duration: ${model.dayLength}</h6>
        </div>
      </div>
    `;
    return html;
  }
  
}
