# Vue nodejs serverless dynamodb 게시판 만들기
vue 와 서버리스 기술을 이용한 게시판 만들기

vue 와 serverless framework 를 사용하여 서버리스의 개념을 연습해본다

## 설치
### 로컬PC 에서 설치
```bash
# 백엔드 API 를 설치한다
cd server
npm install
# 프론트를 설치한다
cd ../client
npm install
# 테스트와 배포환경을 설치한다
cd ..
npm install
```
### 로컬PC 에서 테스트
serverless-offline 를 활용하여 PC 에 Client, Backend, Database 를 실행한다

#### 첫번째. terminal 창 3개를 활용하여 DB, Client, Server 를 실행하는 방법
```bash
# dynamodb 를 로컬에서 실행한다
npm run db:local
# vue client 를 로컬에서 실행한다
npm run client
# lambda 를 로컬에서 실행한다
npm run deploy1:server
```

#### 두번째. concurrently 를 이용하여 terminal 1개를 사용하여 DB, Client, Server 를 동시에 실행하는 방법
```bash
npm run start:local
```

### AWS 로 배포하는 방법
작성중


## 사용기술
`Vue` : Frontend Framework 3대장 중 1가지
`nodejs` : Javascript 백엔드 구현을 위해서 사용
`AWS Lambda` : 아마존 클라우드의 관리형 함수 서비스
`AWS dynamodb` : 아마존 클라우드의 관리형 NoSQL 데이터베이스
`AWS api gateway` : 아마존 클라우드의 관리형 API 서비스

## 기능
  - 회원기능
    - [x] 회원가입
    - [x] 로그인
    - [x] 인증
  - 게시판
    - [ ] 글 등록
    - [ ] 글 조회
    - [ ] 글 수정
  - 댓글
    - [ ] 댓글 등록
    - [ ] 댓글 조회
    - [ ] 댓글 삭제

## 보강할 기능
  - [x] API 에 네비게이션 가드 적용하여 인증 필수 페이지 처리
  - [ ] vuex 의 store 를 module 로 분리
  - [ ] Refresh Token 을 이용한 보안 강화
  - [ ] Dynamodb 의 페이징 처리
  - [ ] GraphQL 을 적용하여 API 를 단순화 할 수 있는지

## About
* Vue nodejs serverless dynamodb board is a free service built and maintained by skyksit@gamil.com.
* Vue nodejs serverless dynamodb is an open source project licensed under the MIT license.