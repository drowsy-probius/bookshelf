const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const path = require('path');
const colors = require('colors');


const db_settings = new PouchDB(path.join(__dirname, 'db/settings'));
const db_library = new PouchDB(path.join(__dirname, 'db/libarary'));

let iter = class{
    constructor(){
        this._id = 'iter';
        this.settings = 0;
        this.library = 0;
    }
}

// init iterator
//db_iter.info().then(info => {if(!info.doc_count){db_iter.put(new iter())}});


let default_setting = {
}

module.exports.user = class {
    constructor(){
        this._id = '';  // equals to username
        this.username = '';
        this.password = ''; // encrypted
        this.group = '';
    }

    toString(){
        return `{
            _id: ${this._id},
            username: ${this.username},
            password: ${this.password}, 
            group: ${this.group}
        }`
    }
}

module.exports.settings = {
    put: (obj) => {

    },

    update: (_id, obj) => {

    },

    get: ({key, value}) => {
        db_library.createIndex({
            index: {
                fields: [key]
            }
        }).then(() => {
            return db_library.find({
                selector: {key: {$regex: `*${value}*` }}
            });
        });
    },

    delete: (_id) => {

    }
}



module.exports.book = class {
    constructor(){
        this._id = '';  // equals to path (absolute)
        this.type = '';  //txt, pdf, cbz, folder, ...
        this.path = '';
        this.parent = '';
        this.added = '';  // Date
        this.last_seen_page = 0;
        this.preview = '';
        this.owner = ''; // user _id
    }

    toString(){
        return `{
            _id: ${this._id},
            type: ${this.type},
            path: ${this.path},
            parent: ${this.parent},
            added: ${this.added},
            last_seen_page: ${this.last_seen_page},
            preview: ${this.preview},
            owner: ${this.owner}
        }`
    }
}

module.exports.library = {
    put: async (obj) => {
        db_library.put(obj).then(()=>{
            console.debug(`[DEBUG] new book added! \n${obj.toString()}`.gray);
        })
        .catch(e=>{
            console.error(e);
            console.trace();
        })
    },

    update: (_id, obj) => {

    },
    
    get_all: async (pageSize=20, offset=0) => {
        try{
            let options = {limit : pageSize, skip : offset, include_docs: true};
            let response = await db_library.allDocs(options);
            if (response && response.rows.length > 0) {
                options.startkey = response.rows[response.rows.length - 1].id;
                options.skip = 1;
            }

            return response;
        }catch(e){
            console.error(e);
            console.trace();
        }
    },

    get: ({key, value}) => {

    },

    delete: (_id) => {

    }
}


// queries
// https://pouchdb.com/guides/mango-queries.html