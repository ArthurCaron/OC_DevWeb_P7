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
    <div class="wrapper">
        <div class="subWrapper">
            <div>
                <span>Email: </span>
                <input type="text" ref="email" />
            </div>
            <div>
                <span>Password: </span>
                <input type="password" ref="password" />
            </div>
            <div class="loginWrapper">
                <div id="login" @click="login">Login</div>
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

.subWrapper > .loginWrapper {
    display: flex;
    justify-content: center;
}

#login {
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: 1px solid black;
    background-color: #4E5166;
    color: white;
    font-size: 18px;
    border-radius: 12px;
    width: 60px;
    padding: 8px;
}

#login:hover {
    background-color: #FD2D01;
}
</style>