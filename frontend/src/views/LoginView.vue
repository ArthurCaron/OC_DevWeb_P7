<script>
import { login } from "../utils/auth";

export default {
    methods: {
        async login() {
            await login(this.$refs.email.value, this.$refs.password.value);
            this.$emit("loggedIn");
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>

<template>
    <div>
        <span>Email:</span>
        <input type="text" ref="email" />
        <span>Password:</span>
        <input type="password" ref="password" />
        <div id="login" @click="login">Login</div>
    </div>
</template>

<style scoped>
#login {
    cursor: pointer;
}
</style>