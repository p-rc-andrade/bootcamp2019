const express = require("express");

const server = express();

// Query params = ?test=1
// Route params = /users/1
// request body = {"name": "Pedro", "email": "pedro.andrade@sbanken.no"}

server.get("/users/:id", (req, res) => {
  //   const name = req.query.name;
  const { id } = req.params;
  //   return res.send("Hey");
  return res.json({ message: `Buscando o usuário ${id}` });
});

server.listen(3000);
