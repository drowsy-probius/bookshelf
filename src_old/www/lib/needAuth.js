async function isLogin(req, res, next)
{
  if(req.session.user && req.session.user.uid)
  {
    return next();
  }
  else
  {
    return res.redirect('/');
  }
}

module.exports = {
  isLogin,
}