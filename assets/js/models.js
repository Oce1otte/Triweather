export class Nearby {

    constructor() {
        this.name = '-';
        this.iconUrl = '';
        this.temp = '-';
    }
    
}

export class Hourly {

    constructor() {
        this.time = '-';
        this.iconUrl = '';
        this.desc = '-';
        this.temp = '-';
        this.feelsLike = '-';
        this.windSpd = '-';
        this.windDir = '';
    }

}

export class Forecast {

    constructor() {
        this.day = '-';
        this.dayShort = '-';
        this.date = '-';
        this.iconUrl = '';
        this.temp = '-';
        this.desc = '-';
        this.hourly = [];
    }

}

export class Weather {

    name = '-';
    country = '-';
    date = '-';
    iconUrl = '';
    desc = '-';
    temp = '-';
    feelsLike = '-';
    sunrise = '-';
    sunset = '-';
    dayLength = '-';
    forecast = [];
    nearby = [];

}