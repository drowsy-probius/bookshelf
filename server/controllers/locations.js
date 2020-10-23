const model = require('../model');

module.exports.index = async (req, res, next) => {
    if(req.session.login){
        try{
            let db = await model.library.get_all();
            let books = db.rows.map(function(item){return item.doc;});
            console.log(books);
            res.render('index', { title: 'Express' , books: books, logined: req.session.login });
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