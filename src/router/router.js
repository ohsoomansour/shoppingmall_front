import {createWebHashHistory, createWebHistory, createRouter } from "vue-router";
import PostList from "@/components/post/PostList.vue";
import App from "@/App.vue";


const routes = [

    {
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
    {
        path : "/user/login",
        name : "login",
        component : () => import("@/components/member/LogIn.vue") 
    },
    {
       path : "/user/signup",
       name : "signup",
       component : () => import("@/components/member/SignUp.vue")
    },
    /* ######################## Spring Security ######################### */
    {
        path: "/sec_user/signup",
        name: "sec_signup",
        component: () => import("@/components/member_security/SignUp.vue")
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
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;