const routes = require('../routes')
const mongoose = require('mongoose')
const swagger = require('../config/swagger')
const fastify = require('./server.js')
const gql = require('fastify-gql')
const schema = require('../schema')

fastify.register(require('fastify-swagger'), swagger.options)

fastify.register(gql, {
    schema,
    graphiql: true
 })

routes.forEach((route, index) => {
    fastify.route(route);
})

// run the server
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()
