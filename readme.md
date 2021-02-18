# TODO

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
- db 포인터를 export할지 아니면 사용할 명령어만 모아서 함수로 만들지

api 만들기 with login session
- /api/v1/search

- /api/v1/list?size=&offset= 
-> {}

- /api/v1/{book.id}/info 
-> {}

- /api/v1/{book.id}/view/{idx} 
-> imagePath/imageBlob/textChunk

- /api/v1/{book.id}/someFunctions...
-> someData


## frontend




https://github.com/OptimalBits/bull


index.js
앱 시작점을 어떻게 처리할까
프로세스 여러개 만들어서 병렬로 처리하고싶은데
병렬로 처리해도 db에 이상 없나?

scan/watch작업은 요청 들어 올때마다 새로운 프로세스 생성하기