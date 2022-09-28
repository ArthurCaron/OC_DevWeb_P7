<script>
import { RouterLink } from "vue-router"
import IconLogoMonoBlackVue from "./icons/IconLogoMonoBlack.vue";

export default {
    components: {
        RouterLink,
        IconLogoMonoBlackVue
    }
}
</script>

<template>
    <header>
        <nav>
            <RouterLink :to="{ name: 'Home' }">
                <IconLogoMonoBlackVue />
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
</style>
    