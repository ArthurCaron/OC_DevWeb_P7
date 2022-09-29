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
        <nav id="loggedIn" v-if="isLoggedIn">
            <div id="filler"></div>
            <RouterLink :to="{ name: 'Home' }">
                <IconLogoMonoBlackVue />
            </RouterLink>
            <div id="logoutDiv">
                <div id="logout" @click="logout">Log Out</div>
            </div>
        </nav>
        <nav id="notLoggedIn" v-else>
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
header {
    width: 100%;
}

#notLoggedIn {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
}

#notLoggedIn > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

#notLoggedIn > div > a {
    border-top: 1px solid #4E5166;
    border-right: 1px solid #4E5166;
    border-left: 1px solid #4E5166;
    padding: 10px;
    margin-right: 30px;
    margin-left: 30px;
}

#loggedIn {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
}

#filler {
    width: 15%;
}

#loggedIn > a {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}

#logoutDiv {
    display: flex;
    justify-content: flex-end;
    width: 15%;
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
    border: 1px solid #4E5166;
    background-color: #4E5166;
    color: white;
    border-radius: 12px;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 5px;
}
</style>
    