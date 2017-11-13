const assert = require('assert');
const app = require('../../../dist/index');
const server = require('supertest');

describe('intro', () => {
  describe('#server', () => {
    afterEach(() => {
      app.close();
    });
    it('should be able to access root /', done => {
      server(app)
        .get('/')
        .expect(200, done);
    });
  });
});