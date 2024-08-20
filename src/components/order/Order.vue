<!-- ### 방법1. 리덕스로 state값을 관리 
- 리덕스를 써야 하는 이유 : 여러 state값을 관리(가시성)하기 좋다. -> vue와 redux보다 vuex가 적절 
- 설치 : npm i vuex   
- 로직 :  Order 컴포넌트, 웹 소켓 구현 => redux, 구매 수 (state값) 관리 => socket server에 
 ✅주문, vuex -> 결제, socket -> 받은 값을 -> vuex, 받은 값-


-->

<template>
    <input v-model="messageToSend" placeholder="Type a message"/>
    <v-btn @click="orderFunc" style="background-color: greenyellow;">주문 하기</v-btn>
    <div v-if="receivedMessage">
      <h2>Received Message:</h2>
      <p>{{ receivedMessage }}</p>
    </div>

</template>

<script>
import { mapState } from 'vuex';

export default{
  name: 'order',

  data(){
    return {
      ws: null,
      messageToSend : '',
      receivedMessage :''
    }
  },
  computed:{
    ...mapState(['cart'])
  },
  mounted(){
    this.initWebSocket();
  },

  methods:{
    initWebSocket(){
      this.ws = new WebSocket('ws://localhost:8080/ws/sales')
      
      this.ws.onopen = () => {
        console.log("====== WebSocket connection opened");
      }
      this.ws.onmessage = (event) => {
        this.receivedMessage = event.data;
        console.log("receivedMessage================> ", this.receivedMessage)
      }
      this.ws.onclose = () => {
        console.log("WebSocket connection closed!!");
      }
      this.ws.onerror = (e) => {
        console.error(e);
      }

    },
    /* #카카오페이 API & Naver 페이
                       
    */
    payFunc(){
      
      // PG,  res.ok message
      return true;
    },
    orderFunc() {
      //결제 요청 API 함수 호출 
      const payResult = this.payFunc(); //this => 현재 컴포넌트 인스턴스(Vue 컴포넌트 인스턴스)
      if(payResult){
        //무어을 전달 ? id, name, price, quantity
        const itemInCart = this.$store.state.cart;
        
        console.log("=======> itemInCart", JSON.stringify(itemInCart));
        if (this.ws) {
          //this.ws.send(JSON.stringify(itemInCart)); // 서버로 메시지 전송
          this.messageToSend = ''; // 전송 후 입력 필드 초기화
        }
      }
    },
    beforeUnmount() {
    // 컴포넌트가 파괴되기 전에 웹소켓 연결 종료
    if (this.ws) {
      this.ws.close();
    }
  } 
  }
  }

</script>