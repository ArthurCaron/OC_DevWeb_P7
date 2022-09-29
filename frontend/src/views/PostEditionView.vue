<script>
import { getToken } from "../utils/auth";

export default {
    data() {
        return {
            post: {
                _id: "",
                userId: "",
                text: "",
                imageUrl: "",
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: []
            },
            image: null
        }
    },
    methods: {
        async fetchData() {
            const res = await fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                }
            });
            this.post = await res.json();
        },
        redirectToHome() {
            this.$router.push({ name: 'Home' });
        },
        async savePost() {
            if (this.image === null) {
                await fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
                    method: "PUT",
                    headers: { 
                        "Accept": "application/json", 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getToken()}`
                    },
                    body: JSON.stringify({ "text": this.post.text })
                });
            } else {
                const formData = new FormData();
                formData.append("post", JSON.stringify({ "text": this.post.text }));
                formData.append("image", this.image);

                await fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${getToken()}`
                    },
                    body: formData
                });
            }
            this.redirectToHome();
        },
        async deletePost() {
            await fetch(`http://localhost:3000/api/posts/${this.$route.params.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                }
            });
            this.redirectToHome();
        },
        imageSelected(e) {
            const file = e.target.files[0];
            this.image = file;
        }
    },
    created() {
        this.fetchData();
    }
}
</script>

<template>
    <div class="post">
        <img :src="post.imageUrl" v-if="post.imageUrl !== undefined" />
        <span class="imageText" v-if="post.imageUrl !== undefined">Update the image:</span>
        <span class="imageText" v-else>Add an image:</span>
        <form>
            <input type="file" accept="image/png, image/jpeg, image/jpg" @change="imageSelected" />
        </form>
        <textarea v-model="post.text" rows="10"></textarea>
        <div class="actions">
            <span class="button" @click="savePost">Save</span>
            <span class="button" @click="deletePost">Delete</span>
        </div>
    </div>
</template>

<style scoped>
.post {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #4E5166;
    padding: 15px;
    box-sizing: border-box;
    background-color: #FFD7D7;
}

.imageText {
    margin-bottom: 5px
}

form {
    margin-bottom: 15px
}

textarea {
    resize: none;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.actions span {
    cursor: pointer;
}

.button {
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: 1px solid black;
    background-color: white;
    padding: 2px;
    width: 60px;
    border-radius: 12px;
    margin-top: 15px;
}

.button:hover {
    color: #FD2D01;
}
</style>
