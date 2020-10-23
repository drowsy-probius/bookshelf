const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');


router.get('/', ctrlLocations.index);

router.get('/reader/1', ctrlLocations.dev)


module.exports = router;
