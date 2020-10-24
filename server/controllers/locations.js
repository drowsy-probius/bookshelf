const model = require('../model');

module.exports.index = async (req, res, next) => {
    if(req.session.login){
        try{
            const db = await model.library.get_all(40, 30);
            const books = db.rows.map(function(item){return item.doc;});

            for(let i=0; i<books.length; i++)
            {
                const book = books[i];
                
                // TODO: 나중에 model에 title항목 추가해서 그거로 바꿔야함.
                book.path = book.path.split('/').pop();

                if( !['txt'].includes(book.type) )
                {
                    book.preview = Buffer.from(book.preview).toString('base64');
                }
            }

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