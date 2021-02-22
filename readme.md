# TODO

##
- db로직
  ~~1. 스캔 결과물 library table에 넣기~~
  2. meta table에서 library(id)를 참조하는 외래키를 이용해서 메타 정리하기
  3. book 페이지별로 주소 넣기
    zip://1.jpg, zip://2.jpg
    folder://
    http:// (지원?)
  4. setting table 처리하기
~~- 프론트 만들어서 제대로 나오는지 테스트하기~~
  ~~1. /api/db~~ /api/db/latest, /api/db/random을 통해서 json 가져올 수 있음.


## backend

plugins/agent 완성하기
- 이름이 비슷한 파일끼리 번들 생성
- 번들 내에서 회차 처리
- 미리보기 생성기
- 파일 길이 (이미지 파일 개수) 

src/app/taskQueue/processor 밖으로 빼내기
- taskQueue폴더에는 queue관리 로직만 가지기
- processor에는 agent, scanner 처리기 존재

db로직 완성하기
~~- db 포인터를 export할지 아니면 사용할 명령어만 모아서 함수로 만들지~~
- bookshelf db포인터만 내보내고 사용되는 함수만 다른 파일에 구현

api 만들기 with login session
- /api/search

- /api/list?size=&offset= 
-> {}

- /api/{book.id}/info 
-> {}

- /api/{book.id}/view/{idx} 
-> imagePath/imageBlob/textChunk

- /api/{book.id}/someFunctions...
-> someData


## frontend

- 아직은 구체적인 계획 없


https://github.com/OptimalBits/bull


index.js
앱 시작점을 어떻게 처리할까
프로세스 여러개 만들어서 병렬로 처리하고싶은데
병렬로 처리해도 db에 이상 없나?

scan/watch작업은 요청 들어 올때마다 새로운 프로세스 생성하기