import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hey there" });
});

export default routes;
// module.exports = routes;
