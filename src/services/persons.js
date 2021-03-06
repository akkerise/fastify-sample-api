const { isEmptyObject } = require('../utils/functions');

class PersonService {
  /**
   * Creates an instance of PersonService.
   * @param {object} app fastify app
   * @memberof PersonService
   */
  constructor(app) {
    if (!app.ready) throw new Error(`can't get .ready from fastify app.`);
    this.app = app;
    const { knex } = this.app;
    if (!knex) {
      throw new Error('cant get .knex from fastify app.');
    }
  }

  /**
   * @store
   *
   * @param {{person: object}} { person }
   * @returns {Promise<number>} created id
   * @memberof PersonService
   */
  async store({ person }) {
    const err = new Error();
    if (!person) {
      err.statusCode = 400;
      err.message = 'person is needed.';
      throw err;
    }
    const { knex } = this.app;
    const id = (await knex('Person').insert(person))[0];
    const createdPerson = await this.one({ id });
    return createdPerson;
  }

  /**
   * @all
   *
   * @param { filter: object } { filter = {} }
   * @returns {Promise<{ id: number }>[]} array
   * @memberof PersonService
   */
  async all({ filter = {} }) {
    const { knex } = this.app;
    return await knex.select('*').from('Person').where(filter);
  }

  /**
   * @one
   *
   * @param {{ id: number }} { id }
   * @returns {Promise<{id: number}>} object
   * @memberof PersonService
   */
  async one({ id }) {
    const err = new Error();
    if (!id) {
      err.message = 'id is needed';
      err.statusCode = 400;
      throw err;
    }
    const { knex } = this.app;
    const data = await knex.select('*').from('Person').where({ id });
    if (!data.length) {
      err.statusCode = 412;
      err.message = `can't get the person ${id}.`;
      throw err;
    }
    const [person] = data;
    return person;
  }

  /**
   * @update
   *
   * @param {{ id: number, person: object }} { id, person = {} }
   * @returns {Promise<{ id: number }>} updated
   * @memberof PersonService
   */
  async update({ id, person = {} }) {
    const personBefore = await this.one({ id });
    if (isEmptyObject(person)) {
      return personBefore;
    }
    const { knex } = this.app;
    await knex('Person')
      .update(person)
      .where({ id: personBefore.id });
    return await this.one({ id });
  }

  /**
   * @delete
   *
   * @param {{ id: number }} { id }
   * @returns {Promise<object>} deleted
   * @memberof PersonService
   */
  async delete({ id }) {
    const personBefore = await this.one({ id });
    const { knex } = this.app;
    await knex('Person').where({ id }).delete();
    delete personBefore.id;
    return personBefore;
  }
}

module.exports = {
  PersonService
};
