const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');


router.get('/', ctrlLocations.index);


module.exports = router;
