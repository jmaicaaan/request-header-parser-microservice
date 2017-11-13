const assert = require('assert');
const app = require('../../../dist/index');
const server = require('supertest');

describe('whoami', () => {
  describe('#server', () => {
    afterEach(() => {
      app.close();
    });
    it('should be able to access root /', done => {
      server(app)
        .get('/')
        .expect(200, done);
    });
    it('should be able to receive parsed header', done => {
      let headers = { 
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        'accept-language': 'en-US'
      };
      let parsedAgent = 'Windows NT 6.1; Win64; x64; rv:47.0';
      server(app)
        .get('/whoami')
        .set('user-agent', headers['user-agent'])
        .set('accept-language', headers['accept-language'])
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.language, headers['accept-language']);
          assert.equal(res.body.software, parsedAgent);
          done(err);
        });
    });
  });
});