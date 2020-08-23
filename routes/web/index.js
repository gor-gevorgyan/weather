const Weather = require('../../controllers/weather');

module.exports = function (fastify, opts, done) {
    fastify.get('/:cityname', Weather.getByCityName);

    done();
};