const express = require('express');
const server = express();

const DATABASE = require('./database.json') 
server.use(express.json())

//MIDDLEWARES

server.use((req, res, next)=>{
  console.count(`Total of requisitions is`);
  next();
})

function thisProjectExists(req, res, next){
  const {id} = req.params
  const project = DATABASE.find(project => project.id_project == id)
  if(!project) 
    return res.status(400).json({ error: 'Project not found' });
  
  next()
}

//ROUTES
server.get('/projects', (req, res)=> res.json(DATABASE))

server.get('/projects/:id', thisProjectExists, (req,res)=>{
  const {id} = req.params
  return res.json(DATABASE[id])
})

server.post('/projects', (req, res) => {
  const {id, title, description} = req.body;
  DATABASE.push({
    id_project:id,
    title,
    description,
    tasks:[]
  });
  return res.status(200).send();
})

server.put('/projects/:id', thisProjectExists, (req, res) => {
  const { id } = req.params;
  const { title, description} = req.body;
  DATABASE[id]= {
    id_project: id,
    title,
    description,
    tasks:DATABASE[id].tasks
  }
  return res.status(200).send();
})

server.post('/projects/:id/tasks', thisProjectExists, (req, res)=>{
  const {id} = req.params;
  const {tasks} = req.body;
  tasks.forEach(task => DATABASE[id].tasks.push(task));

  return res.status(200).send();
});

server.delete('/projects/:id', thisProjectExists, (req, res) => {
  const { id } = req.params;  
  DATABASE.splice(id, 1);

  return res.status(200).send();
})

server.listen(3000)