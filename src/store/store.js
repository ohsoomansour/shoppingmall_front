/** 
 * @설정 : main.js 에 app.use(store) 
 * 

*/
import { createStore } from 'vuex';

export default createStore({
    state: {
      counter: 1,
      loginInfo:null,
    },
    getters: {
      getCounter(state) {
        return state.counter
      },
    },
    mutations: {
      increment(state) {
        state.counter++
      },
      setLoginInfo(state, payload) {
        state.loginInfo = payload
      },
      setLogout(state) {
        state.loginInfo=null;
      },
    },
    actions: {
    },
    modules: {
    }
  })