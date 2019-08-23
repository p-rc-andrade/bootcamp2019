const express = require("express");

const server = express();
server.use(express.json()); // Support: Requests with JSON payloads
server.listen(3000);

// Query params = ?test=1
// Route params = /users/1
// request body = {"name": "Pedro", "email": "pedro.andrade@sbanken.no"}

// CRUD - Create, Read, Update, Delete

const users = ["Pedro", "Lucía", "Retsuko"];

//Global Middleware - gets called in all requests - next()
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  // return next();
  next();
  console.timeEnd("Request");
});

//Local Middleware Functions - Can be called as a parameter in all REST calls
const checkUsername = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Username is required" });
  }

  return next();
};

const checkUserInArray = (req, res, next) => {
  const user = users[req.params.id];

  if (!user) {
    return res.status(400).json({ error: "Id is invalid" });
  }

  req.user = user;

  return next();
};

server.get("/users", (req, res) => {
  return res.json({ users: users });
});

server.get("/users/:id", checkUserInArray, (req, res) => {
  // const { id } = req.params;
  // req.user is being declared on the middleware checkUserInArray
  return res.json({ user: req.user });
});

server.post("/users", checkUsername, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

server.put("/users/:id", checkUsername, checkUserInArray, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  users.splice(id, 1, name);
  return res.json(users[id]);
});

server.delete("/users/:id", checkUserInArray, (req, res) => {
  const { id } = req.params;
  users.splice(id, 1);
  return res.send();
});
