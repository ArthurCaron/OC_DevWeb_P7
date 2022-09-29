<script>
import { login } from "../utils/auth";

export default {
    methods: {
        async signUp() {
            const res = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    "email": this.$refs.email.value,
                    "password": this.$refs.password.value
                })
            });
            const jwt = await res.json();
            sessionStorage.setItem("userId", JSON.stringify(jwt.userId));
            sessionStorage.setItem("token", JSON.stringify(jwt.token));

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
        <div id="signup" @click="signUp">Sign Up</div>
    </div>
</template>

<style scoped>
#signup {
    cursor: pointer;
}
</style>