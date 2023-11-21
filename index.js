const express = require('express');
const server = express();

const DATABASE = require('./database.json') 
server.use(express.json())


// Adicionar Middlewares de validação
// Adicionar as rotas da aplicação
server.get('/projects', (req, res)=> res.json(DATABASE) )

server.listen(3000)