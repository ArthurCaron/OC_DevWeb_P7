<script>
import Header from "./components/Header.vue";
import { RouterView } from "vue-router";
import { isLoggedIn } from "./utils/auth";

export default {
    components: {
        RouterView,
        Header
    },
    data() {
        return {
            isLoggedIn: isLoggedIn()
        }
    },
    methods: {
        logUpdate() {
            this.isLoggedIn = isLoggedIn();
        }
    }
}
</script>

<template>
    <div class="wrapper">
        <Header :isLoggedIn="isLoggedIn" @loggedOut="logUpdate"></Header>
        <RouterView @loggedIn="logUpdate" />
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 720px;
}
</style>
