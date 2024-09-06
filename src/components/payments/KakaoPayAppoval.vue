<template>
  <p>카카오 결제 내역서</p>
  <v-container>
    <v-card class="pa-4">
      <!-- 청구서 헤더 -->
      <v-row>
        <v-col cols="6">
          <h2></h2>
          <p>요청 번호(aid):{{ this.aid }}</p>
          <p>결제승인 날짜: {{ this.approved_at }}</p>
        </v-col>
        <v-col cols="6" class="text-right">
          <h4>가맹점 정보</h4>
          <p> 가맹점 회원 아이디: {{ this.partner_user_id }}</p>
          <p> 주문 번호: {{ this.partner_order_id }}</p>
        </v-col>
      </v-row>

      <!-- 고객 정보 -->
      <v-divider></v-divider>
      <v-row class="mt-4">
        <v-col cols="6">
          <h4>Bill To:{{  }}</h4>
          <p></p>

        </v-col>
        <v-col cols="6" class="text-right">
          <h4>Ship To:</h4>
          <p></p>
          <p></p>
        </v-col>
      </v-row>

      <!-- 항목 리스트 -->
      <v-divider></v-divider>
      <v-simple-table dense class="mt-4">
        <thead>
          <tr>
            <th class="text-center pa-2">Item</th>
            <th class="text-center pa-2">Quantity</th>
            <th class="text-center pa-2">point</th>
            <th class="text-center pa-2">discount</th>
            <th class="text-center pa-2">Vat</th>
            <th class="text-center ">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td class="text-center pa-2">{{ this.item_name }}</td>
            <td class="text-center pa-2">{{ this.quantity }}</td>
            <td class="text-center pa-2">{{ this.amount.point }}</td>
            <td class="text-center pa-2">{{ this.amount.discount }}</td>
            <td class="text-center pa-2">{{ this.amount.vat }}</td>
            <td class="text-center ">{{ this.amount.total }}</td>
          </tr>
        </tbody>
      </v-simple-table>

      <!-- 총합계 -->
      <v-row class="mt-4">
        <v-col cols="6"></v-col>
        <v-col cols="6" class="text-right">
          <v-row>
            <v-col>Subtotal:</v-col>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col>Tax (%):</v-col>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col><strong>Total:</strong></v-col>
            <v-col><strong></strong></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container> 
</template>
   
   
   <script>
   export default {
     name: 'kakaopayApproval',
     data(){
      return{
        amount:{
          discount:0,
          point:0,
          tax_free:0,
          total:0,
          vat:0
        },
        approved_at: "",
        cid:"",
        created_at:"",
        item_code:"",
        item_name:"",
        partner_order_id:"",  
        partner_user_id: "",
        payment_method_type: "",
        quantity:0,
        sid:"", 
        tid:"",
      }
     },
     methods:{
      async getMyBill(){
        //문제 : 쿼리 스트링 값을 못 가져오고 있다.
        // #/payment/approval?aid=A6da85974bee06fb44a6 -> /payment/approval?aid=A6da85974bee06fb44a6
        const hash = window.location.hash.substring(1); 
        console.log("hash============>", hash ) //"/payment/approval?aid=A6da85974bee06fb44a6"    
        const queryString = hash.split("?")[1]; // aid=A6da85974bee06fb44a6"
        if(queryString){
          const params = new URLSearchParams(queryString); 
          const aid  = params.get("aid");
          console.log("aid=======>", aid);
          const result = await(
            await fetch(`/api/pay/getMyBill?aid=${aid}`, {
            method: 'GET',
            headers:{
              'Content-Type' : 'application/json'
            }
          })
          ).json();
          console.log(result)
          this.approved_at = result.approved_at;
          this.item_name = result.item_name;
          this.partner_order_id = result.partner_order_id;
          this.partner_user_id = result.partner_user_id;
          this.payment_method_type = result.payment_method_type;
          this.quantity = result.quantity;
          this.tid = result.tid;
          this.cid = result.cid;
          this.aid = result.aid;
          this.amount.vat = result.amount.vat;
          this.amount.total = result.amount.total;
          
        }
      }
     },

     mounted(){
      this.getMyBill();
     }
   }
   
   </script>