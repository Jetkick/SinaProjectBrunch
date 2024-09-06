# 📌 프로젝트 소개

### 프로젝트 소개
- [브런치](https://brunch.co.kr/) 사이트를 참고한 백엔드 개인 프로젝트입니다. 


<br>

### 프로젝트 기간

2024.07.15~2024.07.26 (약 2주)


<br>

## 개발 인원

### Back-End Developers
- [박상우](https://github.com/Jetkick)


<br>

## STACK

### Back-End

|NestJS|TypeScript|GraphQL|PlayGround|MySql|
| :--: | :--: | :--: | :--: | :--: |
|<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="65" alt="Nest Logo" />|<div style="display: flex;"><img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="icon" width="65" style="width: 65px; height: 65px; margin-right: 0px; margin-bottom: 0px;" /></div>|<div style="display: flex;"><img src="https://techstack-generator.vercel.app/graphql-icon.svg" alt="icon" width="65" style="width: 65px; height: 65px; margin-right: 0px; margin-bottom: 0px;" /></div>|<a href="https://www.apollographql.com/docs/apollo-server/v2/testing/graphql-playground/"/><img src=https://raw.githubusercontent.com/apollographql/apollo-client-devtools/main/assets/apollo-wordmark.svg width="65" />|<img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" />|


<br>

## 사용한 툴

#### Common
- <img src="https://img.shields.io/badge/Git-F05032?style=flat&amp;logo=Git&amp;logoColor=white">
- <img src="https://img.shields.io/badge/GitHub-181717?style=flat&amp;logo=GitHub&amp;logoColor=white">
- <img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&amp;logo=Visual Studio Code&amp;logoColor=white">
- <img src="https://img.shields.io/badge/DBeaver-382923?style=falt&logo=dbeaver&logoColor=white">
- <img src="https://img.shields.io/badge/dbdiagram-F08705?style=flat&logo=diagramsdotnet&logoColor=white">

<br>


# 📌 구현 사항 설명

## 회원가입/로그인
### BE
- signUp 폴더와 users 폴더 두개로 나뉘어 signUp 폴더에서 유저의 생성, 수정, 조회, 삭제를 담당하도록 하였고, <br>
  users 폴더에서 로그인 및 토큰 관련 로직을 구현하였다. <br>
  다만, 브런치는 카톡으로만 가입이 되도록 연동되어 있어서 소셜 로그인은 구현하지 않았다. <br>
  users 폴더에서 토큰 생성 요청이 들어오면 토큰이 만들어지는 과정과 검증은 auth 폴더에서 담당하고있다.

<br>

## 구독하기
### BE
- subScription은 유저와 구독할 유저를 DB 관계 설정을 통해서 표현하도록 하였다.

<br>

## 이야기 (스토리 or 게시글)
### BE
- stories는 유저가 집필한 스토리를 관리하는 테이블이다. <br>
  이야기 혹은 게시글인 이 스토리는 브런치의 가장 핵심 서비스이자 메인 컨텐츠이다.

<br>

## 댓글/ 좋아요
### BE
- likes / comments 는 스토리와 엮여있어서 관계 설정을 통해서 표현하였다.


<br>

## 스토리 북
### BE
- storyBooks는 브런치의 두번째 핵심 컨텐츠라고 생각한다. <br>
  연재하고 있다고 알림이나 태그로 표시를 설정할 수 있고 <br>
  마치 책 처럼 이야기를 한 곳에 엮어 놓아 보기 좋게 정리해 놓은 것이 이야기 책이다.

<br>

## 결제
### BE
- payments. 마지막은 결제 시스템이다. <br>
  결제와 함께 댓글을 달아서 작가를 응원하거나, 책을 구입하거나, 이벤트에 참여하는 등이 있다.


<br>

## 회고록
- [벨로그](https://velog.io/@tooil10/sinaProjectBrunch-%ED%9A%8C%EA%B3%A0%EB%A1%9D)



<br>


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod


