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
            this.$router.push({ name: 'Home' })
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
                })
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
                })
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
    }
}
</script>
    
<template>
    <div class="creator">
        <span>Add an image:</span>
        <form ref="image">
            <input type="file" accept="image/png, image/jpeg, image/jpg" @change="imageSelected" />
        </form>
        <textarea v-model="text" rows="10"></textarea>
        <span @click="createPost">Post</span>
    </div>
</template>

<style scoped>
.creator {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
}

textarea {
    resize: none;
}

span {
    cursor: pointer;
}
</style>
    