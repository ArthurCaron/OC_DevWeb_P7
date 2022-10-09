<script>
import { RouterLink } from "vue-router";
import { getToken, getUserId, getUserRole } from "../utils/auth";

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
            console.log(getUserRole());
            this.userCreated = this.post.userId === getUserId() || getUserRole() === "admin";
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
            });
            this.fetchData();
        },
        like() {
            if (this.alreadyLiked) {
                this.likePost(0);
            } else {
                this.likePost(1);
            }
        },
        dislike() {
            if (this.alreadyDisliked) {
                this.likePost(0);
            } else {
                this.likePost(-1);
            }
        }
    },
    created() {
        this.fetchData();
    },
    computed: {
        alreadyLiked() {
            return this.post.usersLiked.includes(getUserId());
        },
        alreadyDisliked() {
            return this.post.usersDisliked.includes(getUserId());
        }
    }
}
</script>

<template>
    <div class="post">
        <a :href="post.imageUrl"><img :src="post.imageUrl" v-if="post.imageUrl !== undefined" /></a>
        <p>{{ post.text }}</p>
        <div class="actions">
            <div class="likes">
                <span :class="{ active: alreadyLiked }" @click="like"><i class="far fa-thumbs-up"></i>{{ post.likes }}</span>
                <span :class="{ active: alreadyDisliked }" @click="dislike"><i class="far fa-thumbs-down"></i>{{ post.dislikes }}</span>
            </div>
            <RouterLink 
                class="button"
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
    border: 1px solid black;
    margin-bottom: 5px;
    border-radius: 12px;
    padding: 15px;
    box-shadow: #4E5166 1px 1px 2px;
}

.post > a > img {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

p {
    margin: 10px 0px;
    min-height: 50px;
}

.actions > a {
    display: flex;
    justify-content: center;

    width: 60px;
    text-decoration: none;
    color: black;
}

.button {
    display: flex;
    justify-content: center;
    cursor: pointer;
    background-color: white;
    padding: 2px;
    width: 60px;
    margin-top: 15px;
}

.button:hover {
    color: #FD2D01;
    text-decoration: underline;
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
    align-items: center;
    
    width: 45px;
    height: 25px;
    border-radius: 30px;
    background-color: #FFD7D7;
    border: 1px solid black;
    cursor: pointer;
    margin-right: 5px;
}

.likes span.active {
    background-color: #FD2D01;
    color: white;
}

.likes span:hover {
    background-color: #FD2D01;
    color: white;
}

.likes span i {
    margin-right: 3px;
}
</style>