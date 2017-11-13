'use strict';

var assert = require('assert');
var app = require('../../../dist/index');
var server = require('supertest');

describe('whoami', function () {
  describe('#server', function () {
    afterEach(function () {
      app.close();
    });
    it('should be able to access root /', function (done) {
      server(app).get('/').expect(200, done);
    });
    it('should be able to receive parsed header', function (done) {
      var headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0',
        'accept-language': 'en-US'
      };
      var parsedAgent = 'Windows NT 6.1; Win64; x64; rv:47.0';
      server(app).get('/whoami').set('user-agent', headers['user-agent']).set('accept-language', headers['accept-language']).expect(200).end(function (err, res) {
        assert.equal(res.body.language, headers['accept-language']);
        assert.equal(res.body.software, parsedAgent);
        done(err);
      });
    });
  });
});