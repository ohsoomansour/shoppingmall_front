import {createWebHashHistory, createRouter } from "vue-router";
//import { useStore } from 'vuex';
import store from '@/store/store'; // Vuex Store import
import { mapGetters } from 'vuex'

const routes = [
    {
        path: "/auth/success",
        name: "oauth2_success",
        component : () => import("@/components/member_security/OAauth2_AuthSuccess.vue")
    }
    ,{
        path: "/payment",
        name: "kakaopay",
        component : () => import("@/components/payments/KakaoPay.vue")
    },
    {
        path: "/payment/approval",
        name : "kakaopay_success",
        component : () => import("@/components/payments/KakaoPayAppoval.vue")
    },
    {
        path: "/payment/fail",
        name : "kakaopay_fail",
        component : () => import("@/components/payments/KaokaoPayFail.vue")
    },
    {
        path: "/payment/cancel",
        name : "kakaopay_cancel",
        component : () => import("@/components/payments/KakaoPayCancel.vue")
    },
    {
        path: "/products/my_items",
        name: "myitems",
        component : () => import("@/components/mypage/MyShoppingItems.vue")
    },
    {
        path:"/detailedprod/:id",
        name: "detailedprod",
        component: () => import("../components/order/DetailedProduct.vue")
    },
    {
        path: "/products",
        name : "products",
        component : () => import("@/components/order/Products.vue")  
    },
    
    /* ######################## Spring Security ######################### */
    {
        path: "/admin/user_management",
        name: "UserManagement",
        component: () => import("@/components/admin/UserManagement.vue"),
        meta:{ isRoleRequired: true, requiredAuth: 'ROLE_ADMIN'}
    },
    {
        path: "/sec_user/join",
        name: "sec_signup",
        component: () => import("@/components/member_security/SecSignUp.vue")
    },
    {
        path: "/sec_user/login",
        name: "SecLoginPage",
        component: () => import("@/components/member_security/SecLogIn.vue"),
        mets: { isRoleRequired: false }
    },
    {
        path : "/posts/writing",
        name : "writing",
        component: () => import("../components/post/WritingPost.vue")
    },
    {
        path: "/posts",
        name: "posts",
        component: () => import("@/components/post/PostList.vue")
    },
    {
        path: "/forbidden",
        name: "ForbiddenPage",
        component: () => import("@/components/Forbidden.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

//전역 가드를 설정: 
/**
 *@to : to는 '목적지 라우트' 
 *@matched : to.matched는 매칭된 라우트 경로들을 배열 형태로 제공 
   - matchedElement(임의작성): {path: '', name: '',  component: }
  @VueRouter 전역 가드에서 Vuex Store에 접근할 때는 this 문맥을 사용할 수 없기 때문에 
   - this.$store 사용법 : this.$store는 '전역 사용법' + import store 하지않고도 사용가능
  @getters : mapGetters에서 사용? 컴포넌트 내에서 computed로 사용하는 것임으로 전역 가드에서는 사용하지 않는다.
    -> 기존: const authority = store.getters.authority;  -> 값을 못 가져옴 '상수'로 초기 undefined 값 고정되고 -> 실제 값 할당하지 못 하기 때문에
    -> 수정: let authority = store.getters.authority; 
    

 */
router.beforeEach(function(to, from, next){

   let authority = store.getters.authority;
   console.log("store.getter.authority -> ", authority);
   console.log("store.authority-> ", authority);
   //권한 필요한 경우 
   if(to.matched.some(matchedElement => matchedElement.meta.isRoleRequired )){
        console.log("권한이 필요하네!");
        //권한 확인 
        const requiredAuth = to.meta.requiredAuth;
        console.log("필요한 권한 -> ", requiredAuth);
        if(requiredAuth && requiredAuth !== authority[0]){
            next({ name: 'ForbiddenPage'});
        } else {
            next();
        }
   //권한 필요x      
   } else {
     console.log("권한 불필요!");
     next();
   }
});

export default router;