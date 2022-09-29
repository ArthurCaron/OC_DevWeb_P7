<script>
import { RouterLink } from "vue-router";
import IconLogoMonoBlackVue from "./icons/IconLogoMonoBlack.vue";

export default {
    components: {
        RouterLink,
        IconLogoMonoBlackVue
    },
    props: {
        isLoggedIn: Boolean
    },
    methods: {
        logout() {
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("token");
            this.$emit("loggedOut");
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<template>
    <header>
        <nav v-if="isLoggedIn">
            <RouterLink :to="{ name: 'Home' }">
                <IconLogoMonoBlackVue />
            </RouterLink>
            <div id="logout" @click="logout">Log Out</div>
        </nav>
        <nav v-else>
            <IconLogoMonoBlackVue />
            <RouterLink :to="{ name: 'Login' }">
                Login
            </RouterLink>
            <RouterLink :to="{ name: 'SignUp' }">
                Sign up
            </RouterLink>
        </nav>
    </header>
</template>

<style scoped>
nav {
    width: 100%;
}

a {
    display: block;
    height: 100%;
}

#logout {
    cursor: pointer;
}
</style>
    