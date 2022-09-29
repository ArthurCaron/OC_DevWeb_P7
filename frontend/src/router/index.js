import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import HomeView from "../views/HomeView.vue";
import PostEditionView from "../views/PostEditionView.vue";
import { isLoggedIn } from "../utils/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    {
        path: "/login",
        name: "Login",
        component: LoginView
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUpView
    },
    {
        path: "/",
        name: "Home",
        component: HomeView,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/post/:id",
        name: "PostEdition",
        component: PostEditionView,
        props: true,
        meta: {
            requiresAuth: true
        }
    }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn()) {
        next({ name: "Login" });
    } else {
        next();
    }
});

export default router;
