# SLUV FrontEnd

## 🤰🏻 손민수템 공유 커뮤니티 개발

### 👻 팀원 소개!

| 이미지1                               | 이미지2                              |
| ------------------------------------- | ------------------------------------ |
| [김보인](https://github.com/Boin-Kau) | [박준용](https://github.com/ezenjun) |

### 🥾 개발환경 및 기술스택

| 분류       | 이름                   | 버전          |
| ---------- | ---------------------- | ------------- |
| 개발환경   | Node.js                | v16.15.0      |
| -          | npm                    | 8.5.5         |
| -          | React                  | 18.1.0        |
| 상태관리   | Recoil                 | 0.7.3-alpha.2 |
| 스타일링   | Styled-Components      | 5.3.5         |
| -          | Scss                   | 1.52.1        |
| 애니메이션 | react-transition-group | 4.4.2         |
| 서버통신   | Axios                  | 0.27.2        |

## 👐🏻 Git 컨벤션

### 🎮 커밋 메시지

```
################
# <타입> : <제목> 의 형식으로 제목을 아래 공백줄에 작성
# 제목은 50자 이내 / 변경사항이 "무엇"인지 명확히 작성 / 끝에 마침표 금지
# 예) feat : 로그인 기능 추가

# 바로 아래 공백은 지우지 마세요 (제목과 본문의 분리를 위함)

################
# 본문(구체적인 내용)을 아랫줄에 작성
# 여러 줄의 메시지를 작성할 땐 "-"로 구분 (한 줄은 72자 이내)

################
# 꼬릿말(footer)을 아랫줄에 작성 (현재 커밋과 관련된 이슈 번호 추가 등)
# 예) Close #7

################
# feat : 새로운 기능 추가
# fix : 버그 수정
# docs : 문서 수정
# test : 테스트 코드 추가
# refact : 코드 리팩토링
# style : 코드 의미에 영향을 주지 않는 변경사항
# chore : 빌드 부분 혹은 패키지 매니저 수정사항
################
```

### 🎹 Git branch 전략

-   본인의 이름으로 branch를 만들고, 해당 branch에서 개발을 진행합니다.
    ```
      git branch charles
      git checkout charles
    ```
-   add, commit을 진행합니다!
-   개인이 만든 로컬 브랜치 위치에서 깃허브 서버로 push를 진행합니다.

    ```
      git checkout charles
      git push origin charles
    ```

-   깃허브 본인 브랜치에서 main 브랜치로 PR을 날려줍니다.
-   main 브랜치에 merge가 완료됐다면, 로컬 main 브랜치에서 git pull을 받아줍니다.
    ```
      git checkout main
      git pull origin main
    ```
-   본인 브랜치로 다시 이동해서, main 브랜치를 merge 해줍니다.
    ```
      git checkout charles
      git merge main
    ```

## React 개발 컨벤션

-   .jsx : 컴포넌트를 작성한다면, .tsx로 파일 확장자 명을 작성한다.
-   .js : 자바스크립트를 활용한 로직만을 위한 파일이라면 .js로 파일 확장자 명을 작성한다.(atom.js 등)
