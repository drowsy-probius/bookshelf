const {PluginScanners} = require('../utils')
const {Scanner} = require('../');

/**
 * @param {Object} job {path: path.string, scanner: scannerName}
 * @returns null
 */
function processor(job)
{
  return new Promise((resolve, reject) => {
    const library = job.path;
    const scannerName = job.scanner;
    
    try
    {
      const scanner = new Scanner(library, scannerName);
      scanner.work()
      .then(()=>{
        resolve(scanner.resuslt);
      })
    }
    catch(e)
    {
      reject(e);
    }

  })
}

module.exports = processor;
