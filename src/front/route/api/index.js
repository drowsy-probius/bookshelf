const express = require('express');
const databaseRouter = require('./database');
const scanRouter = require('./scan');


const router = express.Router();

router.use('/scan', scanRouter);
router.use('/db', databaseRouter);

/**test */
const {scannerQueue, agentQueue, databaseQueue} = require('../../../queue');

router.use('/test/scan', (req, res) => {
  const job = Math.random() * 1000
  scannerQueue.push(job);
  res.send(`${job} added to scanner queue.\n`);
});

router.use('/test/db', (req, res) => {
  const job = Math.random() * 1000
  databaseQueue.push(job);
  res.send(`${job} added to database queue\n`);
});

router.use('/test/agent', (req, res) => {
  const job = Math.random() * 1000;
  agentQueue.push(job);
  res.send(`${job} added to agent queue\n`);
});
/**test */

router.use('/', (req, res)=>{res.send('/api page')});

module.exports = router;
