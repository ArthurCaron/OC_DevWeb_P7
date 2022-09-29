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
        <div>
            <div>
                <RouterView @loggedIn="logUpdate" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 720px;
}

.wrapper > div {
    border: 1px solid black;
    background-color: #FFD7D7;
}

.wrapper > div > div {
    margin: 20px;
}
</style>
