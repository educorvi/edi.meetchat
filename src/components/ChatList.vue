<template>
    <div>
        <b-input placeholder="Suchen" class="rounded-0" v-model="search" name="search" autocomplete="off"/>
        <div v-for="(chat, index) in filteredChats" :key="index+chat.name" @click="search=''">
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
    //Auflistung aller Chats
    //@group ChatList
    export default {
        name: "ChatList",
        components: {ChatPreview},
        computed: {
            ...mapGetters(["chats"]),
            //Ermöglicht das Suchen nach Chats; bei keinem Suchbegriff werden alle Chats ausgegeben
            filteredChats() {
                return this.search === ""?this.chats:this.chats.filter(obj=>obj.name.toLowerCase().includes(this.search.toLowerCase()));
            }
        },
        props: {
            //Gibt an, ob sich der Nutzer auf einem mobilen Endgerät befindet
            mobile: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                search: ""
            }
        },
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
