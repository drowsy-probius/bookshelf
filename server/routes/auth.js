const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');

router.post('/login', (req, res, next) => {
  if(req.body.id && req.body.pw ){  // TODO: model에서 새로운 로그인 로직 만들기
    req.session.regenerate( () => {
      req.session.login = true;
      req.session.user_id = req.body.id;

      console.debug(`[DEBUG] login approved as "${req.body.id}" @/routes/auth.js`.green);
      //console.debug(req.session);
      res.redirect('/');
    })
  }else{
    console.debug(`[DEBUG] login not approved as "${req.body.id}" @/routes/auth.js`.red);
    res.redirect('/');
  }

});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;