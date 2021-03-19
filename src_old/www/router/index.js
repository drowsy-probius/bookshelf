const express = require('express');
const dbRouter = require('./api/db');
const scanRouter = require('./api/scan');

const router = express.Router();

router.use('/scan', scanRouter);

router.use('/db', dbRouter);

router.use('/', (req, res) => {res.send('root page')});


module.exports = router;