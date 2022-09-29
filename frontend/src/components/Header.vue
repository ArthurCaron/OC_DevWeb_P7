<script>
import { RouterLink } from "vue-router";
import IconLogoMonoBlackVue from "./icons/IconLogoMonoBlack.vue";
import { logout } from "../utils/auth";

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
            logout();
            this.$emit("loggedOut");
            this.$router.push({ name: 'Login' });
        }
    },
    computed: {
        isLoginPage() {
            return this.$route.name === "Login";
        },
        isSignUpPage() {
            return this.$route.name === "SignUp";
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
            <div>
                <RouterLink :class="{ selected: isLoginPage }" :to="{ name: 'Login' }">
                    Login
                </RouterLink>
                <RouterLink :class="{ selected: isSignUpPage }" :to="{ name: 'SignUp' }">
                    Sign up
                </RouterLink>
            </div>
        </nav>
    </header>
</template>

<style scoped>
nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
}

nav > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

nav > div > a {
    border-top: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid black;
    padding: 10px;
}

.selected {
    background-color:  #FFD7D7;
}

a {
    display: block;
    height: 100%;
    text-decoration: none;
    color: black;
}

#logout {
    display: flex;
    justify-content: center;
    width: 80px;
    cursor: pointer;
    border: 1px solid black;
    background-color:  #FFD7D7;
}
</style>
    