import { introHandler, whoamiHandler } from './handlers/index';

export function routes(app) {
  app.get('/', introHandler);
  app.get('/whoami', whoamiHandler);
};