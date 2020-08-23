// Require environments
require('dotenv').config();

const path = require('path');

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: process.env.LOGGER === "1" })

// Include view engine
fastify.register(require('point-of-view'), {
    engine: {
        twig: require('./classes/extendedTwig')
    },
    root: path.join(__dirname, 'view'),
    viewExt: 'twig',
});

//set public put
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
});

// Declare a routes
fastify.register(require('./routes/web'));

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()