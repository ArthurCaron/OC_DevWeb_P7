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
        <div>
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
    display: flex;
    flex-direction: column;
}

.wrapper > div > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 8px;
}

.wrapper > div > .signupWrapper {
    display: flex;
    justify-content: center;
}

#signup {
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: 1px solid black;
    background-color: #FD2D01;
    color: white;
    width: 60px;
    padding: 8px;
}
</style>