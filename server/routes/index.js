const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');


router.get('/', ctrlLocations.index);

router.get('/dev', ctrlLocations.dev)


module.exports = router;
