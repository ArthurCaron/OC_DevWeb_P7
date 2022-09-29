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
    <div class="wrapper">
        <div class="subWrapper">
            <div>
                <span>Email:</span>
                <input type="text" ref="email" />
            </div>
            <div>
                <span>Password:</span>
                <input type="password" ref="password" />
            </div>
            <div class="signupWrapper">
                <div id="signup" @click="signUp">Sign up</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    border: 1px solid #4E5166;
    background-color: #FFD7D7;
    width: 100%;
    border-radius: 12px;
    box-shadow: #4E5166 1px 1px 2px;
}

.subWrapper {
    display: flex;
    flex-direction: column;
    padding: 10px;
}

.subWrapper > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 8px;
}

.subWrapper > .signupWrapper {
    display: flex;
    justify-content: center;
}

#signup {
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: 1px solid black;
    background-color: #4E5166;
    font-size: 18px;
    color: white;
    width: 60px;
    padding: 8px;
    border-radius: 12px;
}

#signup:hover {
    background-color: #FD2D01;
}
</style>