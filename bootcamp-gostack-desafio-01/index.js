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

// GLOBAL Middleware - Request Counter
let counter = 0;
server.use((req, res, next) => {
  console.log(`Requests Count: ${++counter}`);

  return next();
});

// LOCAL Middleware - Input Validation
const checkNewProjectForm = (req, res, next) => {
  const { id, title } = req.body;

  if (!id) return res.status(400).json({ error: "Id is required" });
  if (!title) return res.status(400).json({ error: "Title is required" });

  if (projects.find(item => item.id === `${id}`))
    return res.status(409).json({ error: "Project Id found" });

  return next();
};

const checkParamsId = (req, res, next) => {
  const { id } = req.params;

  if (!projects.find(item => item.id === `${id}`))
    return res.status(404).json({ error: "Project Id not found" });

  return next();
};

//[GET] /projects
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//[POST] /projects
server.post("/projects", checkNewProjectForm, (req, res) => {
  const { id, title } = req.body;

  projects.push({ id: `${id}`, title: `${title}`, tasks: [] });

  return res.send(projects);
});

//[PUT] /projects/:id
server.put("/projects/:id", checkParamsId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const targetProject = projects.find(p => p.id === `${id}`);
  const targetProjectIndex = projects.findIndex(p => p.id === `${id}`);

  targetProject.title = title;

  projects.splice(targetProjectIndex, 1, targetProject);

  return res.send(projects);
});

//[DELETE] /projects/:id
server.delete("/projects/:id", checkParamsId, (req, res) => {
  const { id } = req.params;
  const targetProjectIndex = projects.findIndex(p => p.id === `${id}`);

  projects.splice(targetProjectIndex, 1);

  return res.send(projects);
});

//[POST] /projects/:id/tasks
server.post("/projects/:id/tasks", checkParamsId, (req, res) => {
  const { id } = req.params;
  const task = req.body.title;
  const targetProjectIndex = projects.findIndex(p => p.id === `${id}`);
  const targetProject = projects.find(p => p.id === `${id}`);

  targetProject.tasks.push(task);

  projects.splice(targetProjectIndex, 1, targetProject);

  return res.send(projects);
});
