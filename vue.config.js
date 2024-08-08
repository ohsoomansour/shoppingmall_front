

/** 
 * @transpileDependencies : 특정 종송성 패키지를 Babel을 사용하여 트랜스파일 할 수 있도록 설정
 *  - Javascript(ES6) 코드 ======> Javascript(ES5)로 변환하는 것이 트랜스파일 
 *  - 호환성 기능 
 *  - 자동화 도구 : 트랜스파일 작업은 Babel, Typescript 컴파일러, SAAS 등과같은 도구를 통해 자동화 
 * @lintOnSave : 저장할 때 ESLint가 자동으로 실행되어 검사 유무 
 * @module.export = defineConfig({}) : 설정 객체를 모듈로 내보냄 
 * @client : { overlay :false }; "컴파일 오류나 린트 오류가 발생했을 때 브라우저 화면에 오버레이를 표시하지 않음 "
 * @proxy : 프록시 설정은 API 요청을  다른 서버로 프록시(중계)하는 데 사용, 이는 CORS 문제를 해결하거나 개발 중에 다른 서버의 API와 통실할 때 유용 
 *  ##모든 경로('/')로 시작하는 요청을 프록시합니다. 기본적으로 모든 요청을 프록시합니다.
 *  - target : 프록시 대상 서버를 http://localhost로 설정, 모든 프록시 요청은 로컬 호스트로 전달 
 *  - changeOrigin : 프록시 요청의 호스트 헤더를 대상 서버의 호스트로 변경
 *  - pathRewrite : 프록시 요청 경로에서 /api를 제거, 예를 들어 /api/users 요청은 /users로 전달 
 * 
 *  - ws : false 
 * @npm run serve : "실시간으로 컴파일하고 변경 사항을 감지하여 브라우저에 자동으로 반영"
 *  순서 : 변경 감지 -> .vue 파일, Javascript 모듈로 변환, CSS 파일 등이 Webpack과 관련 로더를 통해 처리
 *        -> Vue 로더 역할: .vue를 js로 변환, Babel은 JS를 transpiling 
 *        -> 웹팩, bundle 생성 : 처리된 파일들이 Webpack에 의해 번들로 묶임 -> 번들은 메모리에 저장, 이를 통해 브라우저에 즉시 사용 
 *  
 * 개발 모드에서 VueCLI의 개발 서버를 실행
 *  *npm run serve 컴파일: 브라우저에서 실행 가능한 형태로 변환하는 과정
 *  *일반적인 compile : 프로그래밍에서 고수준 프로그래밍 언어 -> 저수준의 기계어 중간 코드로 변환하는 과정
*/



const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    client: {
      overlay: false,
    },
    port: 8088,
    // Proxy 설정
    proxy: {
      // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정, target default 포트가 8080 ? 
      '/': {
        target: 'http://localhost:8080',   //## 주의 사항:포트가 꼬여있을 수 있다. port kill이 되지 않을 경우 -> 컴퓨터 off -> cmd에서 netsta -a -o port확인 필요!  ## 
        changeOrigin: true,
        // 요청 경로에서 '/api' 제거
        pathRewrite: { '^/api': '' },
        ws: false,
      },
    },
  },
})

