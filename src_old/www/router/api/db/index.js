const express = require('express');
const dbRouter = express.Router();

const service = require('./service');

dbRouter.get('/latest', (req, res) => {
  res.send(service.getFirst10FromLibrary())
})

dbRouter.get('/random', (req, res) => {
  res.send(service.getRandom10FromLibrary())
})

// dbRouter.get('/', 
// (req, res) => {},
// (req, res) => {})

module.exports = dbRouter;