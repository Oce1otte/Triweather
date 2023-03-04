export class ForecastWeatherRenderer {
  
  static render(model) {
    let html = '';
    for (let i = 0; i < 5 ; i++) {
      html += `
        <button id="day-${i + 1}-btn" class="btn">
          Day ${i + 1}
        </button>
      `
    }
    return html;
  }
  
}