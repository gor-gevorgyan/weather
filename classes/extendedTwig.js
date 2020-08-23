const twig = require('twig');
const openWeatherAPI = require('../classes/open-weather-api');
const moment = require('moment');

twig.extendFunction('weather_icon', name => {
    return openWeatherAPI.getIconURL(name);
});

twig.extendFunction('date_format', (date, format) => {
    return moment.unix(date).format(format);
});

module.exports = twig;