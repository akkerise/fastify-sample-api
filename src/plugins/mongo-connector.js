const {
  DB_NOSQL_HOST,
  DB_NOSQL_NAME
} = require('../environment');

const MONGO_URL = `mongodb://${DB_NOSQL_HOST}/${DB_NOSQL_NAME}`;
const mongoConnector = app => {
  app.register(require('fastify-mongodb'), { forceClose: true, url: MONGO_URL });
};

module.exports = mongoConnector;
