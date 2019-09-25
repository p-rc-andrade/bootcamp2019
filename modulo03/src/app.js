import express from 'express';
import path from 'path';
import routes from './routes';

import './database'; // Database connection

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Need to Enable Express to serve JSON
    this.server.use(express.json());
    // Need to Enable Express to serve STATIC files like images
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
