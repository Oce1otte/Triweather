export class HourlyWeatherRenderer {
  
  static render(model) {
    let html = '';

    html += `
      <div>
        <h2 style = "color:rgb(200, 50, 50); font-family: Georgia, 'Times New Roman', Times, serif">HOURLY</h2>
      </div>
    `

    // Information Table
    {
      for (let j = 0; j < 5 ; j++) 
      {  
        html += `
          <table id = "day-${j + 1}-form">
            <tr>
              <td>
                ${model.forecast[j].day}
              </td>
          `

        for(let i = 0; i < model.forecast[j].hourly.length; i++)
        {
          html += `
          <td>
            ${model.forecast[j].hourly[i].time}
          </td>
          `
        }

        console.log(html);


        html += `
              </tr>
              <tr>
              <td>Forecast</td>
        `
        for(let i = 0; i < model.forecast[j].hourly.length; i++)
        {
          html += `<td>${model.forecast[j].hourly[i].desc}</td>`
        }

        html += `
              </tr>
              <tr>
              <td>Temp°C</td>
        `

        for(let i = 0; i < model.forecast[j].hourly.length; i++)
        {
          html += `<td>${model.forecast[j].hourly[i].temp}</td>`
        }

        html += `
              </tr>
              <tr>
              <td>RealFeel</td>
        `

        for(let i = 0; i < model.forecast[j].hourly.length; i++)
        {
          html += `<td>${model.forecast[j].hourly[i].feelsLike}</td>`
        }

        html += `
              </tr>
              <tr>
              <td>Wind (km/h)</td>
        `

        for(let i = 0; i < model.forecast[j].hourly.length; i++)
        {
          html += `<td>${model.forecast[j].hourly[i].windSpeed} ${model.forecast[j].hourly[i].windDir}</td>`
        }

        html += `
            </tr>
          </table>
        `
      }
    }

    return html;
  }
  
}
