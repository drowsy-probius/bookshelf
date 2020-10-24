const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const path = require('path');
const {} = require('colors');

const db_settings = new PouchDB(path.join(__dirname, 'db/settings'));
const db_library = new PouchDB(path.join(__dirname, 'db/library'));


/*************** inner functions *********************/

let __setting = class {
    constructor(){
        this._id = 'setting';
        this.value = '';
        this.users = [];
    }

    toString(){
        return `{

        }`
    }
}

let __user = class {
    constructor(){
        this.username = '';
        this.password = ''; // encrypted
        this.group = '';
    }

    toString(){
        return `{
            username: ${this.username},
            password: ${this.password}, 
            group: ${this.group}
        }`
    }
}

let __book = class {
    constructor(){
        this._id = ''
        this.type = '';  // zip, txt, pdf, epub, folder, ...
        this.path = '';
        this.parent = '';
        this.added = '';  // Date
        this.last_seen_page = 0;
        this.preview = '';
        this.group = ''; // user _id
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
            group: ${this.group}
        }`
    }
}


let __settings = {
    put: async (obj) => {
        await db_settings.put(obj);
    },
    update: async (obj) => {
        await db_settings.put(obj);
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
    delete: ()=>{

    }
}

let __library = {
    put: async (obj) => 
    {
        try
        {
            obj._id = obj.path;
            await db_library.put(obj);
            console.debug(`[DEBUG] new book added: ${obj.path}`.gray)
        }
        catch(e)
        {
            if(e.name === 'conflict'){
                console.error(`${obj.path} is duplicated. @model.library.put`);
            }else{
                console.error(e);
                console.trace();
            }
        }
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
        // queries
        // https://pouchdb.com/guides/mango-queries.html
    },

    delete: (_id) => {

    },

    isDuplicate: (path) => {
        return new Promise((resolve, reject) => {
            let id = path;
            db_library.get(id).catch(e=>{
                console.log(e);
                console.log('@model.library.isDuplicate')
                if(e.name === 'not_found'){
                    resolve(false);
                }
            }).then(doc => {
                resolve(true);
            })
        })
    },

    library: db_library
}


// iterator 초기화
// db_iter.info().then(info => {if(!info.doc_count){db_iter.put(new iter())}});


/************** modules *****************/

module.exports.user = __user;

module.exports.settings = __settings;

module.exports.book = __book;

module.exports.library = __library;