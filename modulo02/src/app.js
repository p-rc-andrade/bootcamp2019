// The new import modules syntax seen in react ins't yet supported by node.
// That said, we need to use the "require" syntax or use babel/babelnode
// or Sucrase
// const express = require("express");
import express from "express";
import routes from "./routes";

class App {
  // constructor gets called when class App gets instantiated
  constructor() {
    this.server = express();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// module.exports = new App().server;
export default new App().server;
