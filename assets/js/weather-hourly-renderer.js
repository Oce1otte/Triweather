import { Weather } from './models.js';


export class HourlyWeatherRenderer {
  
  static render(model) {
    let html = '';
    for (let i = 0; i < 5 ; i++) {
      html += `
        <div id="day-${i + 1}-form" class="text-white">
          Index ${i} -> day ${i + 1}
        </div>
      `
    }
    return html;
  }
  
}