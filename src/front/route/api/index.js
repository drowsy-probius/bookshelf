const express = require('express');
const databaseRouter = require('./database');
const scanRouter = require('./scan');

const router = express.Router();

router.use('/scan', scanRouter);
router.use('/db', databaseRouter);
router.use('/', (req, res)=>{res.send('/api page')});

module.exports = router;
