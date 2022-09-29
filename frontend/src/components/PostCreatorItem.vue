<script>
import { getToken } from "../utils/auth";

export default {
    data() {
        return {
            text: "",
            image: null
        }
    },
    methods: {
        redirectToHome() {
            this.$router.push({ name: 'Home' });
        },
        async createPost() {
            if (this.image === null) {
                await fetch(`http://localhost:3000/api/posts`, {
                    method: "POST",
                    headers: { 
                        "Accept": "application/json", 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({ "text": this.text })
                });
            } else {
                const formData = new FormData();
                formData.append("post", JSON.stringify({ "text": this.text }));
                formData.append("image", this.image);

                await fetch(`http://localhost:3000/api/posts`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${getToken()}`
                    },
                    body: formData
                });
            }
            this.clear();
            this.$emit("postCreated");
        },
        imageSelected(e) {
            const file = e.target.files[0];
            this.image = file;
        },
        clear() {
            this.text = "";
            this.image = null;
            this.$refs.image.reset();
        }
    },
    computed: {
        isTextEmpty() {
            return this.text === "";
        }
    }
}
</script>
    
<template>
    <div class="creator">
        <span class="imageText">Add an image:</span>
        <form ref="image">
            <input type="file" accept="image/png, image/jpeg, image/jpg" @change="imageSelected" />
        </form>
        <textarea v-model="text" rows="10" ></textarea>
        <span class="button" @click="createPost" :class="{ disabled: isTextEmpty }">Post</span>
    </div>
</template>

<style scoped>
.creator {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #4E5166;
    padding: 15px;
    box-sizing: border-box;
    background-color: #FFD7D7;
    border-radius: 12px;
    box-shadow: #4E5166 1px 1px 2px;
}

.imageText {
    margin-bottom: 5px
}

form {
    margin-bottom: 15px
}

.button {
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: 1px solid black;
    background-color: #4E5166;
    color: white;
    padding: 5px;
    width: 60px;
    font-size: 18px;
    border-radius: 12px;
    margin-top: 15px;
}

.disabled {
    background-color: black;
    color: #4E5166;
    pointer-events: none;
}

textarea {
    resize: none;
}
</style>
    