<script>
import PostItem from "../components/PostItem.vue";
import PostCreatorItem from "../components/PostCreatorItem.vue";
import { getToken } from "../utils/auth";

export default {
    components: {
        PostItem,
        PostCreatorItem
    },
    data() {
        return {
            posts: null
        }
    },
    methods: {
        async fetchAll() {
            const res = await fetch("http://localhost:3000/api/posts", {
                headers: {
                    "Authorization": `Bearer ${getToken()}`
                }
            });
            this.posts = await res.json();
        }
    },
    mounted() {
        this.fetchAll();
    }
}
</script>

<template>
    <main>
        <PostCreatorItem @postCreated="fetchAll"/>
        <ul>
            <li v-for="post in posts">
                <PostItem :key="post._id" :postId="post._id" />
            </li>
        </ul>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 1000px;
    background-color: white;
}

main, ul, li {
    width: 100%;
    padding: 0;
    margin: 0;
}

li {
    list-style-type: none;
}

</style>