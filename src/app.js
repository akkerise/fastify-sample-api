const App = require('fastify');
const cors = require('cors');

// order to register / load
// 1. plugins (from the Fastify ecosystem)
// 2. your plugins (your custom plugins)
// 3. decorators
// 4. hooks and middleware
// 5. your services

const instance = async () => {
  const app = App({ bodyLimit: 1048576 * 2, logger: { prettyPrint: true } });

  // plugins
  await require('./plugins/mongo-connector')(app);
  await app.register(require('fastify-express'));
  await app.register(require('./routes/api'), { prefix: 'api' });

  // middleware
  app.use(cors());
  return app;
};

// implement inversion of control to make the code testable
module.exports = instance;
