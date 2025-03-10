# 프로젝트 정보

5개의 프론트앤드 프레임워크를 사용해보며 비교하기 위해서 시작한 프로젝트.
간단한 게시판 기능(로그인/회원가입, 글 작성)을 통해서 각 프레임워크 기능들을 활용했다.
배포를 최소화 하여 간단하게 실행할 수 있도록 Express를 통한 SSR 방식을 사용했고, Firebase Storage를 사용해 데이터를 저장했다.

- Javascript를 사용해 로그인/회원가입 페이지 구현
- 5개의 프레임워크를 사용해 게시판 기능 구현
- Express, Firebase를 사용해 서버 구현, SSR로 배포
- 번들러로 Vite를 사용해서 빌드 (Angular는 Angular CLI를 기본으로 지원하지만 통일을 위해 Vite 사용)

---

- Front Frameworks
  - React + React router dom
  - Vue + Vue router
  - Angular
  - Svelte + SvelteKit
  - JQuery
- Back Frameworks
  - Express

---

- Libraries
  - date-fns : 날짜 처리 라이브러리
  - multer : 미디어 파일 처리 라이브리러

---

- Npm workspaces를 활용한 모노레포 구조
  - `apps/` : 각 프레임워크 별 애플리케이션
  - `apps/server/` : Express 를 활용한 단일 서버
  - `apps/server/dist/` : 각 프레임워크의 빌드 파일
  - `apps/styles/` : 공통으로 사용하는 스타일 css
  - `packages/types/` : 공통으로 사용하는 타입 패키지
- Firebase Storage를 활용한 데이터 저장, 관리

---

# 각 프레임워크 별 특징

|     특징      |         React         |          Vue          |       Angular        |          Svelte          |      JQuery      |
| :-----------: | :-------------------: | :-------------------: | :------------------: | :----------------------: | :--------------: |
|  데이터 흐름  |        단방향         |      양방향 가능      |        양방향        |       양방향 가능        |  직접 변수 조작  |
|   DOM 조작    |       가상 DOM        |       가상 DOM        |       실제 DOM       |      직접 DOM 조작       |  직접 DOM 조작   |
|    라우팅     |   react-router-dom    |      Vue router       |         내장         |        SvelteKit         |        X         |
|   상태 관리   |   Redux, Zustand 등   |      Vuex, Pinia      |      NgRx, RxJS      |       내장 (store)       |        X         |
|  렌더링 방식  | CSR (SSR 기본 미지원) | CSR (SSR 기본 미지원) |       CSR, SSR       | CSR (SSR 지원-SvelteKit) | CSR (SSR 미지원) |
|  코드 재사용  |    함수형 컴포넌트    |          SFC          | 클래스 기반 컴포넌트 |           SFC            |        X         |
|  학습 난이도  |         중간          |         쉬움          |        어려움        |           쉬움           |       쉬움       |
|    생태계     |          큼           |          큼           |          큼          |           작업           |      오래됨      |
| 대형 프로젝트 |   라이브러리를 활용   |   라이브러리를 활용   | 대형프로젝트에 최적  |            X             |        X         |
|   파일 포맷   |    `.jsx`, `.tsx`     |        `.vue`         |   `.component.ts`    |        `.svelte`         |   `.js`, `.ts`   |

## SSR

서버를 통해 하나의 IP로 배포하기 위해서 모두 SSR을 사용했다.

- React, Vue, Angular : 빌드한 파일을 서버에서 배포

```js
// express router
router.use('/react', express.static(path.join(__dirname, './dist/react-build')));

router.get('/react/*', (req, res) => {
	res.sendFile(path.join(__dirname, './dist/react-build/index.html'));
});
```

- Svelte : SvelteKit으로 빌드해서 서버에서 handler를 연결해 배포
  _svelte 빌드 파일은 mjs 포맷을 사용해서 서버의 cjs와 충동하는 문제가 발생했고, 서버 전체를 mjs로 변경해서 해결했다._

```js
//express router
router.use('/svelte', svelteHandler);
router.get('/svelte/*', express.static(path.join(__dirname, './dist/svelte-build')));
```

- JQuery : Typescript를 빌드해 서버에서 배포
