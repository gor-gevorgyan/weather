const axios = require('axios');

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

class OpenWeatherApi {
    /*
    create end point URL
    */
    generateURL(params) {
        let url_params = "?";

        if (params instanceof Object) {
            let keys = Object.keys(params);

            if (keys.length > 0) {
                for (let param_name of keys) {
                    url_params += `${param_name}=${params[param_name]}&`;
                }
            } else {
                throw new Error("params can't be empty");
            }
        } else {
            throw new Error('params can be object');
        }

        return `${API_URL}/${url_params}APPID=${process.env.API_KEY}`;
    }

    static getIconURL(name, big = false) {
        return `http://openweathermap.org/img/wn/${name}${big ? '@2x' : ''}.png`;
    }

    async get(params) {
        return await axios.get(this.generateURL(params));
    }
}

module.exports = OpenWeatherApi;