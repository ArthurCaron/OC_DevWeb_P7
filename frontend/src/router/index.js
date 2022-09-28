import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import PostEditionView from "../views/PostEditionView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/post/:id",
        name: "PostEdition",
        component: PostEditionView,
        props: true
    }
    ]
})

export default router
