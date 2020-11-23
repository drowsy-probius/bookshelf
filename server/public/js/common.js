const buf2img = (buf) => {
  // arraybuffer to blob
  // https://gist.github.com/candycode/f18ae1767b2b0aba568e
  const urlCreator = window.URL || window.webkitURL;
  const pic = urlCreator.createObjectURL( new Blob([buf], { type: 'image/png' }) );
  return pic;
}

const buf2pdf = (buf) => {
const urlCreator = window.URL || window.webkitURL;
const pdf = urlCreator.createObjectURL( new Blob([buf], { type: 'application/pdf' }) );
return pdf;
}

/**
* {String} name
* {String} classlist
*/
const createElement = (name, classlist) => {
let tmp = document.createElement(name);
tmp.classList = classlist;
return tmp;
}


let __width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
let __height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

// window.addEventListener('resize', event => {
//   __width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
//   __height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
//   if(last_seen !== undefined && last_seen !== null)
//   {
//     change_view_mode(current_view_mode)
//   }
// });
