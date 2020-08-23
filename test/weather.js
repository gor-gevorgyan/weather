// Require environments
require('dotenv').config();

const weatherHelper = require('../classes/open-weather-api');

module.exports = {
    checkAPI: async (country_name) => {
        try {
            let weatherAPI = new weatherHelper();
            let data = await weatherAPI.get({q: country_name});

            return data.data.name.toLowerCase();
        } catch (e) {
            return false;
        }
    }
}