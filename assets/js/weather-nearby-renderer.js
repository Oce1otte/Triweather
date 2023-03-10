export class NearbyWeatherRenderer {
  
  static render(model) {
    let html = `
      <h4>NEARBY PLACES</h4>
      <div class="row">
    `;
    for(let city of model.nearby) {
      html += `
          <div class="weather-nearby-city col-11 col-sm-5 col-xl-2 mx-auto text-end rounded-1">
            <h5 class="float-start text-start">${city.name}</h5>
            <img class="me-3 me-sm-1 me-md-3 me-lg-5 me-xl-3 ms-2 ms-sm-0 d-inline-block" src="${city.iconUrl}"></img>
            <h6 class="me-sm-1 me-md-3 me-lg-5 me-xl-4 d-inline-block">${city.temp}°C</h6>
          </div>
      `;
    }
    return html += `
      </div>
    `;
  }
  
}