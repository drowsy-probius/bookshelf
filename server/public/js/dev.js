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
  2: __btn_book_full
}


/************************************************************/
let last_seen = {
  current_page: 0,
  current_offset: 0,
  total_page: $('#content').children.length,
  total_offset: $('#content').height()
}
let current_view_mode = 0;


/**
 * View Mode
 * 
 * 0: webtoon view (scroll)
 * 1: one page view
 * 2: two pages view (for height/width > 1 images)
 * 3: full screen view
 */
const change_view_mode = view_mode => {
  current_view_mode = view_mode;
  /**
   *  set drop-up menu 
   */
  const dropdown_menu = document.getElementById('dropdown_menu');
  dropdown_menu.innerHTML = '';
  for(let i=0, divider=0; i<3; i++)
  {
    if(i === view_mode)
    {
      continue;
    }
    dropdown_menu.insertAdjacentHTML('beforeend', __btn_view[i]);
    if(divider < 3 - 2)
    {
      divider++;
      dropdown_menu.insertAdjacentHTML('beforeend', __dropdown_divider);
    }
  }

  /**
   *   change view mode
   */
  const before_content = document.getElementById('content');
  const header = document.getElementById('header_nav');
  const footer = document.getElementById('footer_nav');

  if(view_mode === 0)
  {
    header.setAttribute("style", `z-index: 10;
                                  color: rgb(44, 32, 0);
                                  background-color: rgba(255, 255, 255, 0.5)!important;
                                  position: fixed!important;
                                  width: 100vw;
                                  height: 2.5em;
                                  outline: 0.5px solid rgba(0, 0, 0, 0.1); `);

    footer.setAttribute("style", `z-index: 10;
                                  color: rgb(44, 32, 0);
                                  background-color: rgba(255, 255, 255, 0.5)!important;
                                  position: fixed!important;
                                  width: 100vw;
                                  outline: 0.5px solid rgba(0, 0, 0, 0.1);
                                  display: block;
                                  bottom: 0;
                                  left: 0;
                                  height: 3em;`);
    
  }
  else if(view_mode === 1)
  {
    header.setAttribute("style", `z-index: 10;
                                  color: rgb(44, 32, 0);
                                  background-color: rgba(255, 255, 255, 0.5)!important;
                                  position: fixed!important;
                                  width: 100vw;
                                  height: 2.5em;
                                  outline: 0.5px solid rgba(0, 0, 0, 0.1); `);

    footer.setAttribute("style", `z-index: 10;
                                  color: rgb(44, 32, 0);
                                  background-color: rgba(255, 255, 255, 0.5)!important;
                                  position: fixed!important;
                                  width: 100vw;
                                  outline: 0.5px solid rgba(0, 0, 0, 0.1);
                                  display: block;
                                  bottom: 0;
                                  left: 0;
                                  height: 3em;`);
  }
  else if(view_mode === 2)
  {
    header.setAttribute("style", `z-index: 10;
                                  color: rgb(44, 32, 0);
                                  background-color: rgba(255, 255, 255, 0.5)!important;
                                  position: fixed!important;
                                  width: 100vw;
                                  height: 2.5em;
                                  outline: 0.5px solid rgba(0, 0, 0, 0.1); `);

    footer.setAttribute("style", `z-index: 10;
                                  color: rgb(44, 32, 0);
                                  background-color: rgba(255, 255, 255, 0.5)!important;
                                  position: fixed!important;
                                  width: 100vw;
                                  outline: 0.5px solid rgba(0, 0, 0, 0.1);
                                  display: block;
                                  bottom: 0;
                                  left: 0;
                                  height: 3em;`);
  }

}
change_view_mode(0);



const current_view = () => {
  const docViewTop = $(window).scrollTop();
  const docViewBottom = docViewTop + $(window).height();

  const last_seen_element = $(`[data-idx=${last_seen.current_page}]`)[0];
  
  if( last_seen_element === undefined || last_seen_element === null )
  {
    console.log(`data-idx ${last_seen.current_page} does not exists.`)
    return;
  }

  const elemViewTop = $(last_seen_element).offset().top;
  const elemViewBottom = elemViewTop + $(last_seen_element).height();

  if(docViewTop < elemViewBottom)
  {
    console.log(`viewing data-idx ${last_seen.current_page}`);
    return;
  }

  const contents = $('#content').children();

  for(let i=last_seen.current_page; i<contents.length; i++)
  {
    const elemViewTop = $(contents[i]).offset().top;
    const elemViewCenter = elemViewTop + $(contents[i]).height()/2;

    if( elemViewCenter >= docViewTop && elemViewCenter <= docViewBottom )
    {
      last_seen.current_page = parseInt( contents[i].dataset.idx );
      last_seen.current_offset = $(contents[i]).offset().top;
      last_seen.total_page = contents.length;
      last_seen.total_offset = $('#content').height();

      // send last_seen data to server

      return;
    }
  }
}

if ($('.navbar').length > 0) { // check if element exists

  $(window).on('scroll', function() {
    current_view();

    if( $(this).scrollTop() <= 0 || 
        $(this).scrollTop() + __height + 50 >= $('#content').height() ) // some extra value: 50
    {
      $('.navbar').fadeIn(200);
    }
    else
    {
      $('.navbar').fadeOut(200);
    }
  });

  $('#content').click(e => {
    $('.navbar').fadeToggle(200);
  })

}


/************************************************************/
let doc = null
let start = new Date().getTime();
let elapsed = 0;


let contents = [];


const socket = io('/dev', {forceNew: true});

socket.on('connect', ()=>{
  console.debug(`socket namespace: /reader`);
})

socket.on('doc', data => {
  doc = data.doc;
})

socket.on('pic', data => {
  if(elapsed === 0){
    elapsed = new Date().getTime() - start;
    console.debug(`image load elapsed time: ${elapsed}ms`);
  }

  console.log(data.idx + '-th image size:' + data.pic.byteLength + 'bytes.');

  const pic = buf2img(data.pic)
  let img = document.createElement('img');
  img.classList = "img "
  img.src = pic
  img.dataset.idx = data.idx;

  document.getElementById('content').appendChild(img);
});

socket.on('err', e => {
  console.debug(e);
})