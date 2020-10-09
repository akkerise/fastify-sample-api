const { PersonService } = require('../../../services/persons');
const { createSchema, getAllSchema, getOneSchema, updateSchema, deleteSchema } = require('./schemas');

const routes = async (app, options) => {
  const service = new PersonService(app);

  app.post('/', { schema: createSchema }, async (req, rep) => {
    const { body } = req;
    return await service.store({ person: body });
  });

  app.get('/', { schema: getAllSchema }, async (req, rep) => {
    return await service.all({});
  });

  app.get('/:id', { schema: getOneSchema }, async (req, rep) => {
    const { params: { id } } = req;
    return await service.one({ id: id });
  });

  app.patch('/:id', { schema: updateSchema }, async (req, rep) => {
    const { params: { id } } = req;
    const { body } = req;
    return await service.update({ id: id, person: body });
  });

  app.delete('/:id', { schema: deleteSchema }, async (req, rep) => {
    const { params: { id } } = req;
    return await service.delete({ id: id });
  });
};

module.exports = routes;
