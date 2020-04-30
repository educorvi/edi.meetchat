<template>
    <div>
        <div v-for="(chat, index) in chats" :key="index+chat.name">
            <div class="listitem">
                <chat-preview :chat="chat"/>
            </div>
            <hr class="m-0" v-if="index< chats.length-1"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import ChatPreview from "@/components/chatListComponents/chatPreview";
    export default {
        name: "ChatList",
        components: {ChatPreview},
        computed: {
            ...mapGetters(["chats"])
        },
        props: {
            mobile: {
                type: Boolean,
                required: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles";
    @include media-breakpoint-up(md) {
        .listitem:hover {
            background-color: lightgray;
            transition: all 0.1s;
        }
    }

</style>
