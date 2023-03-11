export class ForecastWeatherRenderer {
  
  static render(model) {
    let html = '';
    for (let i = 0; i < 5 ; i++) {
      html += `
        <div type="button" id="day-${i + 1}-btn" class="btn me-sm-1 me-lg-0 me-xl-1 mb-1 mb-sm-0 mb-lg-1 mb-xl-0 p-0">
          <div id="weather-forecast-inner" class="mt-xl-5 pt-xl-4">
            <h5 class="mb-0 mb-sm-3 mb-md-0 mb-xl-3 ms-1 ms-sm-0 ms-md-2 ms-xl-0 text-start text-sm-center text-md-start text-xl-center">${model.forecast[i].dayShort}</h4>
            <h6 class="me-1 me-sm-0 me-md-1 me-lg-3 me-xl-0 mb-0 mb-sm-1 mb-md-0 mb-xl-1 text-end text-sm-center text-md-end text-xl-center">${model.forecast[i].date}</h6>
            <img src="${model.forecast[i].iconUrl}" alt="..."/>
            <h4 class="mb-0 mb-sm-1 mb-lg-0 mb-xl-1">${model.forecast[i].temp}°C</h5>
            <p class="me-1 me-sm-0 me-lg-3 me-xl-0 text-end text-sm-center text-lg-end text-xl-center">${model.forecast[i].desc}</p>
          </div>
        </div>
      `
    }
    return html;
  }
  
}