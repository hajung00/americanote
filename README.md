# ☕ Americanote
![image](https://github.com/hajung00/americanote/assets/66300154/aba9233f-4613-46a0-910d-96a3b3c4943c)
🥈비사이드 온라인 해커톤 포텐데이 403에 참가하여 19팀 중 2등

<br/> 

## 📑 Table Of Contents
1.   👋🏻[ Introduce](#-introduce)<br/>
3.   🗓[ Develop Period](#-develop-period)<br/>
4.   👪[ Team Composition](#-team-composition)  
4.   🕶[ Preview](#-preview)<br/>
5.   ⚙[ Installation](#-installation)<br/>
6.   🛠[ Technology Stack](#-technology-stack)<br/>
7.   📝[ Service Logic](#-service-logic)<br/>
8.   💻[ Function](#-function)<br/>

<br />


## 👋🏻 Introduce
'Americanote'는 프렌차이즈 커피보다 특색있는 개인 카페를 좋아하는분들을 위해 제작한 카페 찾기 서비스입니다.
개인 카페의 경우 직접 방문해야 어떤 원두를 사용하고 맛, 향, 산미, 강도는 어떤지 파악할 수 있습니다.
취향에 맞는 카페를 찾아다니는 불편함을 해결하기 위해 연남동 주변 100개의 카페의 커피의 향, 강도, 산미를 기준으로 분류하여 사용자들이 편하게 확인할 수 있도록 하였습니다.
 
<br />

## 🗓 Develop Period
2024.03.22 ~ 2024.03.31

<br />

## 👪 Team Composition
👨🏻‍💼기획 2, 👩🏻‍🎨디자인 1, 👩🏻‍💻프론트엔드 1, 👩🏻‍💻백엔드 2

<br />

## 🕶 Preview 
|Home|Search|Mypage|
|---|---|---|
|![image](https://github.com/hajung00/americanote/assets/66300154/b4c9422a-a519-4ecd-812b-6744871e73fa)|![image](https://github.com/hajung00/americanote/assets/66300154/c0780479-13d2-42a5-a458-533be2c87e87)|![image](https://github.com/hajung00/americanote/assets/66300154/3a18ee30-51f4-4a56-b9d1-afbc03b95736)|


<br />

## ⚙ Installation
```
$ npm i
$ npm run dev
```    
      


## 🛠 Technology stack

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=react&logoColor=white">  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=react&logoColor=white">  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">  <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">    <img src="https://img.shields.io/badge/SWR-000000?style=for-the-badge&logo=redux&logoColor=white">  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white">  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Heroku&logoColor=white">

<br />

## 📝 Service Logic
![image](https://github.com/hajung00/americanote/assets/66300154/6ce322bb-163e-498c-92b3-fcedbddc0081)

<br />

## 💻 Function
### 1. 카카오 로그인
|View|Function|
|---|-----|
|<img src="https://github.com/hajung00/americanote/assets/66300154/e1f485cb-d835-4824-984f-c2b179b54dde" width="250" height="420"/>|- **카카오 로그인** |

### 2. 나의 커피 취향 등록 및 취향에 맞는 카페 추천
|View|Function|
|---|---|
|<img src="https://github.com/hajung00/americanote/assets/66300154/c20d3b95-8690-4be1-bb33-cdde1bc87788" width="250" height="420"/>|- **내 취향 등록**</br></br>- **취향에 맞는 카페 추천**|


### 3. 다양한 테마의 카페 추천
|View|Function|
|---|---|
|<img src="https://github.com/hajung00/americanote/assets/66300154/26593c41-208a-43d0-b60c-06eb55071c02" width="250" height="420"/>| - **다양한 테마의 카페 추천**</br></br> - **클릭한 카페 상세 모달**</br></br> - **좋아요 및 지도로 이동**|


### 4. 연남동 주변 카페 지도 표시
|View|Function|
|---|---|
|<img src="https://github.com/hajung00/americanote/assets/66300154/924cb4a5-f1cf-4711-9125-a5038cb7bf2e" width="250" height="420"/>|- **네이버 지도 API사용**</br></br> - **카페 아이콘으로 표시**|

### 5. 커피 가격, 향, 강도, 산미 필터링에 따른 카페 표시
|View|Function|
|---|---|
|<img src="https://github.com/hajung00/americanote/assets/66300154/92195b63-efb8-4926-9f1b-0821bed21b84" width="250" height="420"/>|- **필터에 따른 카페 필터링**|

### 6. 카페 검색 
|View|Function|
|---|---|
|<img src="https://github.com/hajung00/americanote/assets/66300154/7b5ebda3-f157-4f2c-a297-5a2fdbd0f003" width="250" height="420"/>|- **카페 검색**</br></br> - **최근 검색어 표시**</br></br> - **검색한 카페 클릭 시 지도로 이동**</br></br>|

### 7. 카페 좋아요 
|View|Function|
|---|---|
|<img src="https://github.com/hajung00/americanote/assets/66300154/86917117-c812-4bd7-b704-c23c01ec7dfb" width="250" height="420"/>|- **카페 좋아요**</br></br> - **카페 좋아요 취소**</br></br> - **좋아요한 카페 아이콘으로 표시**</br></br> - **좋아요한 카페 목록 확인**|
