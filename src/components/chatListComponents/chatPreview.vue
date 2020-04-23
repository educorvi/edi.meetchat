<template>
    <div :class="isActive?'active p-3':'p-3'" @click="$store.commit('setActiveChat', chat)">
        <h5 class="m-0">{{chat.name}}</h5>
    </div>

</template>

<script>
    import {mapGetters} from "vuex"
    export default {
        name: "chatPreview",
        props: {
            chat: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters(["activeChat"]),
            isActive() {
                return this.chat === this.activeChat;
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import "src/styles";

    @include media-breakpoint-up(md) {
        .active {
            background-color: $primary !important;
            color: white;
        }
    }
</style>
