'use strict';

var assert = require('assert');
var app = require('../../../dist/index');
var server = require('supertest');

describe('intro', function () {
  describe('#server', function () {
    afterEach(function () {
      app.close();
    });
    it('should be able to access root /', function (done) {
      server(app).get('/').expect(200, done);
    });
  });
});