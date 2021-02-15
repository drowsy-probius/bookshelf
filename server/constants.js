const path = require('path');


/**
 * environment variable BOOKSHELF_REDIS_PORT or
 * 63279
 */
const REDIS_PORT = Number(process.env.BOOKSHELF_REDIS_PORT) || 63279;


/**
 * environment variable BOOKSHELF_LOG or
 * ./logs
 */
const logConfig = {
  dirname: path.resolve(
    process.env.BOOKSHELF_LOG || path.join(__dirname, '../logs')
  ),
  zippedArchive: false,
  maxFiles: 15,
}

/**
 * environment variable BOOKSHELF_DB or
 * ./database
 */
const databaseDirectory = path.resolve(
  process.env.BOOKSHELF_DB || path.join(__dirname, '../database')
);

/**
 * 
 */
const fileExtensions = {
  image: [
    '.jpg',
    '.gif',
    '.png',
  ],

  zip: [
    '.zip',
    '.cbz',
  ],

  text: [
    '.txt',
  ],

  pdf: [
    '.pdf',
  ],

  epub: [
    '.epub',
  ]
}

/**
 * When determining folder and zip type, 
 * do not count these files as existing.
 * 
 * use with `new RegExp(item)`
 * 
 * folder, zip형식에서는 타겟이 유효한가를 
 * 내용물의 확장자로 판단하는데, 이 과정을 건너 뛸 파일명을 명시
 * 
 * 예시
 * IFN1=[];
 * IFN2=['.\*info.\*'];
 * folder{
 *  1.jpg,
 *  2.jpg,
 *  ...,
 *  9.jpg,
 *  info.txt
 * }; 일때,
 * 
 * IFN1이면 유효하게 처리되지 않고,
 * IFN2이면 유효하게 처리됨.
 */
const ignoreFileNames = [
  '.*readme.*',
  '.*info.*'
]


/**
 * When scanning library,
 * skip these directories/files. (simialr to .plexignore)
 * 
 * 라이브러리 폴더를 스캔할 때,
 * 다음 이름을 가진 타겟(folder, zip, epub, pdf 등 지원하는 타입)은 스킵함.
 */
const ignoreScanNames = [
  
]


module.exports = {
  REDIS_PORT,
  logConfig, 
  databaseDirectory,
  fileExtensions,
  ignoreFileNames,
  ignoreScanNames,
}