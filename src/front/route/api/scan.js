const path = require('path');
const fs = require('fs');
const {libraryDirectory} = require('../../../../config');
const {scannerQueue} = require('../../../queue');

function scanRouter(req, res)
{
  const target = path.resolve(req.params.path || libraryDirectory);
  const scanner = req.params.scanner || 'default';

  scannerQueue.push({
    path: target,
    scanner: scanner,
  })

  res.send(`${target} added to scanner queue.\n`);
};

module.exports = scanRouter;
