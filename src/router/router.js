import {createWebHashHistory, createWebHistory, createRouter } from "vue-router";
import PostList from "@/components/post/PostList.vue";
import App from "@/App.vue";


const routes = [
    /* 
    {
        path:"/",
        name: "home",
        component: () => import("../App.vue"),
    },
    */
    {
        path : "/product",
        name : "product",
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