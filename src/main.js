import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import { createVuetify } from "vuetify";
import "vuetify/styles";
// Material Design Icons를 웹 어플리케이션에서 사용: 아이콘 버튼, 상태 표시, 네비게이션 폼등 웹 애플리케이션의 UI를 더 직관적이고 시각적으로 매력적
import "@mdi/font/css/materialdesignicons.css"; 
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
})


app.use(router)
   .use(vuetify)
   .mount('#app')

app.config.globalProperties.axios = axios;