<template>
    <div v-if="activeChat">
        <p>{{activeChat.name}}</p>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    export default {
        name: "Chatroom",
        computed: {
            ...mapGetters(["activeChat"])
        }
    }
</script>

<style scoped>

</style>
