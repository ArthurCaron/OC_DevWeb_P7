<script>
import Header from "./components/Header.vue"
import { RouterView } from "vue-router"

export default {
    components: {
        RouterView,
        Header
    }
}
</script>

<template>
    <div class="wrapper">
        <Header></Header>
        <RouterView />
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
