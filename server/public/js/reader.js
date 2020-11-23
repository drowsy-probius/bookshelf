/******************** constants ********************/

const __btn_book_scroll = `
<button class="file_image" onclick="change_view_mode(0)">
  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-file-image-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v8.293l-2.73-2.73a1 1 0 0 0-1.52.127l-1.889 2.644-1.769-1.062a1 1 0 0 0-1.222.15L2 12.292V2a2 2 0 0 1 2-2zm6.564 8.27L14 11.708V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-.293l3.578-3.577 2.165 1.299.396.237.268-.375 2.157-3.02zM8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
  </svg>
  스크롤 보기
</button>
`

const __btn_book_half = `
<button class="book_half" onclick="change_view_mode(1)">
  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-book-half" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8.5 2.687v9.746c.935-.53 2.12-.603 3.213-.493 1.18.12 2.37.461 3.287.811V2.828c-.885-.37-2.154-.769-3.388-.893-1.33-.134-2.458.063-3.112.752zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
  </svg>
  1쪽씩 보기
</button>
`

const __btn_book_full = `
<button class="book_full" onclick="change_view_mode(2)">
  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-book-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
  </svg>
  2쪽씩 보기
</button>
`


const __btn_full_screen = `
<button class="full_screen" onclick="change_view_mode(3)">
  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrows-fullscreen" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/>
  </svg>
  전체 화면
</button>
`

const __btn_arrow_left = `
<button class="arrow_left">
  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
  <!-- comments -->
</button>
`

const __btn_arrow_right = `
<button class="arrow_right">
  <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>
</button>
`

const __dropdown_divider = `
  <div class="dropdown-divider"></div>
`

const __btn_view = {
  0: __btn_book_scroll,
  1: __btn_book_half,
  2: __btn_book_full,
  3: __btn_full_screen
}






/******************************************************/

let doc = "<%= JSON.stringify(doc) %>";
doc = doc.replace(/&#34;/g, '\"');
doc = JSON.parse(doc);
console.log(doc);
console.log('111111111111111');


let start = new Date().getTime();
let elapsed = 0;


let contents = [];



const socket = io('/reader', {forceNew: true});


socket.on('connect', ()=>{
  socket.emit('id', { id: '<%= id %>', width: document.body.width, height: document.body.height});
  console.debug(`socket namespace: /reader`);
})

socket.on('pic', data => {
  if(elapsed === 0){
    elapsed = new Date().getTime() - start;
    console.debug(`image load elapsed time: ${elapsed}ms`);
  }

  console.log(data.pic.length);

  const pic = buf2img(data.pic)
  let img = document.createElement('img');
  img.classList = "img "
  img.src = pic
  img.dataset.idx = data.idx;

  document.getElementById('content').appendChild(img);
});

socket.on('txt', data => {
  if(elapsed === 0){
    elapsed = new Date().getTime() - start;
    console.debug(`image load elapsed time: ${elapsed}ms`);
  }

  let tmp = document.createElement('p');
  tmp.classList = "txt "
  tmp.innerText = data.txt;
  tmp.dataset.idx = data.idx;
  document.getElementById('content').appendChild(tmp);
})

socket.on('pdf', data => {
  if(elapsed === 0){
    elapsed = new Date().getTime() - start;
    console.debug(`image load elapsed time: ${elapsed}ms`);
  }

  const pdf = buf2pdf(data.pdf);
  let embed = document.createElement('embed');
  embed.src = pdf;

  document.getElementById('content').appendChild(embed);
})

socket.on('err', e => {
  console.debug(e);
})