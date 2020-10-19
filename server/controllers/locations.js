const model = require('../model');

module.exports.index = async (req, res, next) => {
    let lib_data = await model.library.get_all();
    res.render('index', { title: 'Express' , data: JSON.stringify(lib_data) });
}

module.exports.login = (req, res, next) => {
    if(req.session.login){
        res.render('logout', {session: req.session});
    }else{
        res.render('login', {session: req.session});
    }
}