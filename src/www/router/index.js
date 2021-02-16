const express = require('express');
const scanRouter = require('./api/scan');


const router = express.Router();

router.use('/', (req, res) => {res.send('hello')});

router.use('/api/scan', scanRouter);

module.exports = router;