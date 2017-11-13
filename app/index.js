import express from 'express';
import promise from 'bluebird';
import { routes } from './routes';

const app = express();
const port = process.env.PORT || 3000;
routes(app);

module.exports = app.listen(port, () => console.log(`App is listening on port ${port}`));