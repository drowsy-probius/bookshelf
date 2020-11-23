const express = require('express');
const router = express.Router();

const console = require('../log');

const model = require('../model');
const fileHandler = require('../filehandler/main');


router.get('/:id', async (req, res, next) => {
  try
  {
    const doc = await model.library.get(req.params.id);
    doc.preview = '';
    res.render('reader', {id: req.params.id, doc: doc });
  }
  catch(e)
  {
    res.send(e);
  }
});

router.get('/:id/download', async (req, res, next) => {
  try
  {
    const doc = await model.library.get(req.params.id);

    if(doc.type === 'folder')
    {
      res.attachment(doc.path.split('/').pop() + '.zip');
      fileHandler.folder2zip(doc, res);
    }
    else
    {
      res.download(doc.path);
    }
  }
  catch(e)
  {
    console.error(e);
    console.trace();
    res.send(e);
  }
});



router.get('/:id/:idx', async (req, res, next) => {
  try
  {
    let idx = req.params.idx * 1;
    if(idx === NaN){
      idx = 1;
    }

    const doc = await model.library.get(req.params.id);
    const buffer = await fileHandler.getOne[doc.type](doc.path, idx); 
    res.send(buffer);
  }
  catch(e)
  {
    console.error(e);
    console.trace();
    res.send(e);
  }

})

module.exports = router;