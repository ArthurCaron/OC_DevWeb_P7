<script>
import { RouterLink } from "vue-router";
import { getToken } from "../utils/auth";

export default {
    components: {
        RouterLink
    },
    props: {
        postId: String
    },
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
            userCreated: false
        }
    },
    methods: {
        async fetchData() {
            const res = await fetch(`http://localhost:3000/api/posts/${this.postId}`, {
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                }
            });
            this.post = await res.json();
            this.userCreated = this.post.userId === "1"; // need to check against current user id
        },
        async likePost(like) {
            await fetch(`http://localhost:3000/api/posts/${this.postId}/like`, {
                method: "POST",
                headers: { 
                    "Accept": "application/json", 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ "like": like })
            })
            this.fetchData();
        },
        like() {
            this.likePost(1);
        },
        dislike() {
            this.likePost(-1);
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
        <p>{{ post.text }}</p>
        <div class="actions">
            <div class="likes">
                <span @click="like"><i class="far fa-thumbs-up"></i>{{ post.likes }}</span>
                <span @click="dislike"><i class="far fa-thumbs-down"></i>{{ post.dislikes }}</span>
            </div>
            <RouterLink 
                :to="{ name: 'PostEdition', params: { id: postId }}" 
                v-if="userCreated"
            >
                Edit
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.post {
    box-sizing: border-box;
    width: 100%;
    background-color: red;
    border: 2px solid black;
    margin-bottom: 5px;
}

a {
    display: flex;
    justify-content: center;

    width: 60px;
    text-decoration: none;
    color: black;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.likes {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.likes span {
    display: flex;
    justify-content: center;
    
    width: 30px;
    background-color: pink;
    border: 1px solid black;
    cursor: pointer;
}
</style>