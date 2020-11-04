const {pdf2png} = require('./server/filehandler/pdf2png');

(async ()=>{
  const pdf = new pdf2png(process.argv[2]);
  // console.log(await pdf.getInfo());
  console.log(await pdf.thumbnail());
})();


//pdfjs.thumbnail(process.argv[2]);