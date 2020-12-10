const model = require('../model');
const console = require('../log');

module.exports.index = async (req, res, next) => {
    if(req.session.login){
        try{
            res.render('index', {logined: req.session.login});
        }catch(e){
            console.error(e);
            console.trace();
            res.send('an error occured.');
        }
    }else{
        res.render('login');
    }
}

module.exports.dev = async (req, res, next) => {
    res.render('dev');
}

module.exports.books = async (req, res, next) => {
    let pagesize = req.params.pagesize;
    let offset = req.params.offset;
    let filter = req.params.filter;
    model.library
}