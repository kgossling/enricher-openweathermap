"use strict";
var OpenWeatherMap = class OpenWeatherMap {

    constructor(rp, data, config) {
        this.data = data;
        this.rp = rp;
        this.config = config;
    }

    getConfig() {
        return this.config;
    }

    getName() {
        return 'OpenWeatherMap';
    }

    setData(data) {
        this.data = data;
    }

    // Here starts the action
    process(data) {

        if (typeof data != 'undefined' && data != null) {
            this.data = data;
        }
        //api.openweathermap.org/data/2.5/weather?q={city name}&APPID={APIKEY}
        let req_url = 'http://api.openweathermap.org/data/2.5/weather';
        let options = {
            uri: req_url,
            qs: {
                q: this.data,
                appid: this.config.api_key,
                units: 'metric'
            },
            headers: {
                'User-Agent': 'midas'
            },
            json: true // Automatically parses the JSON string in the response
        };
        return this.rp(options).then((result) => {
            let _result = [];

            try {
                _result = result.main
            } catch (e) {
                _result = null
            }

            return Promise.resolve(_result);
        }).catch((err) => {
            return Promise.resolve('ERROR_NO_RESULT');
        });
    }
};

module.exports.OpenWeatherMap = OpenWeatherMap;