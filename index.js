const express = require('express');
const server = express();

const DATABASE = require('./database.json') 
server.use(express.json())

server.get('/projects', (req, res)=> res.json(DATABASE))

server.get('/projects/:id', (req,res)=>{
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

server.put('/projects/:id', (req, res) => {
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

server.listen(3000)