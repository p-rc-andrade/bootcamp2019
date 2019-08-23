const express = require("express");
const server = express();
const port = 3000;

server.use(express.json()); // JSON payload req support

server.listen(port, () => console.log(`Listening to port: ${port}!`));

const projects = [
  { id: "1", title: "projectX", tasks: [] },
  { id: "2", title: "projectX", tasks: [] },
  { id: "3", title: "projectX", tasks: [] }
];

const checkValidId = (req, res, next) => {
  const { id, title } = req.body;

  if (!id) return res.status(400).json({ error: "Id is required" });
  if (!title) return res.status(400).json({ error: "Title is required" });

  if (projects.find(item => item.id === id))
    return res.status(409).json({ error: "Project Id found" });

  return next();
};

//[GET] /projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//[POST] /projects
server.post("/projects", checkValidId, (req, res) => {
  const { id, title } = req.body;

  projects.push({ id: `${id}`, title: `${title}`, tasks: [] });

  return res.send(projects);
});

//[PUT] /projects/:id
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const targetProject = projects.find(p => p.id === id);
  const targetProjectIndex = projects.findIndex(p => p.id === id);

  targetProject.title = title;

  projects.splice(targetProjectIndex, 1, targetProject);

  return res.send(projects);
});

//[DELETE] /projects/:id
server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const targetProjectIndex = projects.findIndex(p => p.id === id);

  projects.splice(targetProjectIndex, 1);

  return res.send(projects);
});

//[POST] /projects/:id/tasks
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const task = req.body.title;
  const targetProjectIndex = projects.findIndex(p => p.id === id);
  const targetProject = projects.find(p => p.id === id);

  targetProject.tasks.push(task);

  projects.splice(targetProjectIndex, 1, targetProject);

  return res.send(projects);
});
