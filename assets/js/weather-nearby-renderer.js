export class NearbyWeatherRenderer {
  
  static render(model) {
    let html = `
          <h2 style = "color:rgb(200, 50, 50); font-family: Georgia, 'Times New Roman', Times, serif">NEARBY PLACES</h2>
          <div id = "parent" class = "row">

            <div class = "col-12 col-md-6 col-lg-3" id = "town">
                <h5 class = "child col-6" style = "color: white;">${model.nearby[0].name}</h5>
                <img class = "child col-1" src="${model.nearby[0].iconUrl}"></img>
                <h5 class = "child col-2" style = "color: white;">${model.nearby[0].temp}</h5>
            </div>

            <div class = "col-12 col-md-6 col-lg-3" id = "town">
              <h5 class = "child col-6" style = "color: white;">${model.nearby[1].name}</h5>
              <img class = "child col-1" src="${model.nearby[1].iconUrl}"></img>
              <h5 class = "child col-2" style = "color: white;">${model.nearby[1].temp}</h5>
            </div>

            <div class = "col-12 col-md-6 col-lg-3" id = "town">
              <h5 class = "child col-6" style = "color: white;">${model.nearby[2].name}</h5>
              <img class = "child col-1" src="${model.nearby[2].iconUrl}"></img>
              <h5 class = "child col-2" style = "color: white;">${model.nearby[2].temp}</h5>
            </div>

            <div class = "col-12 col-md-6 col-lg-3" id = "town">
              <h5 class = "child col-6" style = "color: white;">${model.nearby[3].name}</h5>
              <img class = "child col-1" src="${model.nearby[3].iconUrl}"></img>
              <h5 class = "child col-2" style = "color: white;">${model.nearby[3].temp}</h5>
            </div>

          </div>
    `;
    return html;
  }
  
}
