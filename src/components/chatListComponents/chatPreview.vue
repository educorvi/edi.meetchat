<template>
    <div :class="isActive?'active p-3':'p-3'" @click="$store.commit('setActiveChat', chat)">
        <h5 class="m-0">{{chat.name}}</h5>
    </div>

</template>

<script>
    import {mapGetters} from "vuex"

    //@group ChatList
    //Zeigt eine Preview des Chats in der Chatübersicht an
    export default {
        name: "chatPreview",
        props: {
            //Der Chat, der angezeigt werden soll, in Form eines Objekts
            chat: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters(["activeChat"]),

            //Ist der Chat der gerade aktive?
            isActive() {
                return this.chat === this.activeChat;
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import "src/styles";

    /*Klasse für den Fall, das der Chat der aktivChat ist; wird nur angewendet, wenn im Desktopmodus*/
    @include media-breakpoint-up(md) {
        .active {
            background-color: $primary !important;
            color: white;
        }
    }
</style>
