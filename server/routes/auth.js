const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');

router.get('/', ctrlLocations.login);

router.post('/login', (req, res, next) => {
  if(req.body.id == '111' && req.body.pw =='111'){
    req.session.regenerate( () => {
      req.session.login = true;
      req.session.user_id = req.body.id;

      res.redirect('/auth');
    })
  }else{
    res.redirect('/auth');
  }

});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/auth');
})

module.exports = router;