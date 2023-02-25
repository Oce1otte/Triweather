export class ShortForecast {

    constructor() {
        this.name = '-'; // day of week
        this.date = '-'; // JUL 03
        this.icon = '';
        this.temperature = '-';
        this.description = '-'; // extended - Clear, Warm
        
        this.feelsLike = '-';
        this.windSpeed = '-';
        this.windDirection = '';
    }

}

export class Hourly {

    constructor() {
        this.time = '-';
        this.icon = '';
        this.description = '-';
        this.temperature = '-';
        this.feelsLike = '-';
        this.windSpeed = '-';
        this.windDirection = '';
    }

}

export class LongForecast {

    constructor() {
        this.name = '-';
        this.hourly = []; // any
    }

}

export class Nearby {

    constructor() {
        this.name = '-';
        this.icon = '';
        this.temperature = '-';
    }
    
}

export class Weather {

    name = '-';
    country = '-';
    date = '-';
    icon = '';
    description = '-';
    temperature = '-';
    feelsLike = '-';
    sunrise = '-';
    sunset = '-';
    daytimeLength = '-';

    shortForecast = []; // 5
    longForecast = []; // 5
    nearbyPlaces = []; // 4

}