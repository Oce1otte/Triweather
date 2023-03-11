export class HourlyWeatherRenderer {
  
  static render(model) {
    let html = `
      <h4 class="mb-2 ms-2">HOURLY</h4>
      <hr/>
    `;
    for (let i = 0; i < 5; i++) {
      let time_cells = '';
      let icon_cells = '';
      let desc_cells = ''; 
      let temp_cells = ''; 
      let feelsLike_cells = '';
      let wind_cells = '';
      let padder = `<td class="p-0"><div style="width: ${(8 - model.forecast[i].hourly.length) * 78 + 13}px"></div></td>`;
      for (let hour of model.forecast[i].hourly) {
        time_cells += `<td>${hour.time}</td>`;
        icon_cells += `<td class="text-center"><img src="${hour.iconUrl}" alt="..."></img></td>`;
        desc_cells += `<td>${hour.desc}</td>`;
        temp_cells += `<td>${hour.temp}°</td>`;
        feelsLike_cells += `<td>${hour.feelsLike}°</td>`;
        wind_cells += `<td>${hour.windSpd} ${hour.windDir}</td>`;
      }
      html += `
        <table id="day-${i + 1}-table" class="weather-hourly-table text-center text-nowrap overflow-x-scroll">
          <tbody>
            <tr class="no-bottom-border">
              <td><h5>${model.forecast[i].day}</h5></td>
              ${time_cells}
              ${padder}
            </tr>
            <tr class="no-bottom-border">
              <td></td>
              ${icon_cells}
              ${padder}
            </tr>
            <tr>
              <td><h6>Forecast</h6></td>
              ${desc_cells}
              ${padder}
            </tr>
            <tr>
              <td><h6>Temp (°C)</h6></td>
              ${temp_cells}
              ${padder}
            </tr>
            <tr>
              <td><h6>RealFeel</h6></td>
              ${feelsLike_cells}
              ${padder}
            </tr>
            <tr>
              <td><h6>Wind (km/h)</h6></td>
              ${wind_cells}
              ${padder}
            </tr>
          </tbody>
        </table>
      `;
    }
    return html;
  }
  
}
