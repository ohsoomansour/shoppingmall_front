import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import axios from 'axios'
import { createVuetify } from "vuetify";
import "vuetify/styles";
// Material Design Icons를 웹 어플리케이션에서 사용: 아이콘 버튼, 상태 표시, 네비게이션 폼등 웹 애플리케이션의 UI를 더 직관적이고 시각적으로 매력적
import "@mdi/font/css/materialdesignicons.css"; 
import * as components from "vuetify/components";
import { VTreeview } from 'vuetify/labs/VTreeview';
import * as directives from "vuetify/directives";
import VTreeViewSample from "./components/common/VTreeViewSample.vue"
import store from '@/store/store';
import { VueQueryPlugin, QueryClient, VueQueryClientProvider } from '@tanstack/vue-query';

const app = createApp(App);
const vuetify = createVuetify({
  components:{
    ...components,
    VTreeview,
  },
  directives,
})
// Vue Query Client 생성
const queryClient = new QueryClient();
app.component('VTreeViewSample', VTreeViewSample);

app.use(router)
   .use(vuetify)
   .use(store)    //🌟애플리케이션에 plugin하여 vuex 스토어를 global로 등록
   .use(VueQueryPlugin, {
    queryClient
   })
   .mount('#app')

app.config.globalProperties.axios = axios;




