<template>
    <p>kakaoPay 페이지</p>
    <v-btn @click="reqPayment()">결제 요청 </v-btn>
   </template>
   
   
   <script>
   export default {
     name: 'kakaopayPage',
     methods:{

      async reqPayment(){
        //헤더 설정
        const data = {
          item_name: 'honey_essence',
          quantity: "1",
          total_amount: "100",
          tax_free_amount: "0",
        };
        const result = await(
          await fetch("/api/pay/ready", {
          method : 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(data)
        })
        ).json();
        console.log(result);
        if(result.next_redirect_pc_url){
           //alert(data.next_redirect_pc_url);
           window.location.href = result.next_redirect_pc_url;
        } else {
          console.error(result);
          
        }
        
      }
     }
   }
   
   </script>