'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

var _index = require('./handlers/index');

function routes(app) {
  app.get('/', _index.introHandler);
};