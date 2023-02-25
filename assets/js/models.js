class Hourly {

    time = '-';
    icon = '';
    description = '-';
    temp_c = '-';
    feels_like = '-';
    wind_kph = '-';
  
}

class Current {
    
    date = '-';
    icon = '';
    description = '-';
    temp_c = '-';
    feels_like = '-';
    sunrise = '-';
    sunset = '-';
}

export class Weather {
    current = new Current();
    nearbyPlaces = [];
}