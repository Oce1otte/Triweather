export class CurrentWeatherRenderer {
  
  static render(model) {
    let html = `
      <h2 class="ms-sm-1 mb-4 mb-sm-0 text-start">CURRENT&nbspWEATHER</h2>
      <h5 class="mb-sm-4 mb-lg-5 text-start text-sm-end">${model.date}</h5>
      <div id="weather-current-icon" class="me-1 me-sm-4 me-md-5 me-lg-2 me-xl-4 ms-sm-5 ms-lg-4 float-end float-sm-none d-sm-inline-block">
        <img src="${model.iconUrl}" alt="..."></img>
        <h3 class="mb-0">${model.desc}</h3>
      </div>
      <div id="weather-current-temp" class="mx-auto me-md-5 me-lg-0 ms-sm-5 overflow-hidden d-sm-inline-block">
        <h1 class="mb-0">${model.temp}°C</h1>
        <h6 class="mb-0">Feels&nbsplike&nbsp<font size="2" face="Trebuchet MS">${model.feelsLike}°C</font></h6>
      </div>
      <div id="weather-current-stat" class="mt-4 mt-sm-0 mt-lg-5 mx-auto ms-sm-5 mx-lg-auto d-sm-inline-block d-lg-block">
        <div>
          <h5>Sunrise:</h5>
          <h4>${model.sunrise}</h4>
        </div>
        <div>
          <h5>Sunset:</h5>
          <h4>${model.sunset}</h4>
        </div>
        <div>
          <h5>Duration:</h5> 
          <h4>${model.dayLength}&nbsphr</h4>
        </div>
      </div>
    `;
    return html;
  }
  
}