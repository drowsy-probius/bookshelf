const express = require('express');
const databaseRouter = require('./database');
const scanRouter = require('./scan');


const router = express.Router();

router.use('/scan', scanRouter);
router.use('/db', databaseRouter);

/**test */
const {scannerQueue} = require('../../../queue');
router.use('/testPush', (req, res) => {
  const job = Math.random() * 1000
  scannerQueue.push(Math.random() * 1000);
  res.send(`${job} added to scanner queue.\n`);
})
/**test */

router.use('/', (req, res)=>{res.send('/api page')});

module.exports = router;
