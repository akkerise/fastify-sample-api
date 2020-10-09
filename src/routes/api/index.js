const swagger = require('fastify-swagger');

const routes = async (app, options) => {
  app.register(swagger, require('../docs'));
  // app.register(require('./persons'), { prefix: 'persons' });
  // app.register(require('./products'), { prefix: 'products' });
  app.get('/', async (request, reply) => ({ hello: 'app' }));
};

module.exports = routes;
