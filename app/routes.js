import { introHandler } from './handlers/index';

export function routes(app) {
  app.get('/', introHandler);
};