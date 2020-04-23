<template>
    <div id="chathistory" v-show="activeChat && (first || first === 0)">
        <div id="overflow" class="customscroll">
            <b-button v-if="first>0" @click="revealOlder" style="width: 100%;">Ältere Nachrichten</b-button>
            <transition-group name="chat" @after-enter="customScroll">
                <Chatmessage :id="message._id" v-for="message in shortendMessages" :user="user"
                   :key="message.user+new Date(message.time).toISOString()" :message="message"></Chatmessage>
            </transition-group>
        </div>
    </div>
</template>

<script>
    /* eslint-disable vue/no-unused-components */

    import {mapGetters} from "vuex"
    import {setRemote, getAllMessages} from "@/database";
    import Chatmessage from "@/components/chatroomComponents/Chatmessage";

    export default {
        name: "Chatroom",
        components: {Chatmessage},
        computed: {
            ...mapGetters(["activeChat", "messages"]),
            shortendMessages() {
                return this.messages ? this.messages.slice(this.first, this.messages.length) : []
            },
            remote() {
                return this. activeChat.url
            }
        },
        data() {
            return {
                user: "julian_0815",
                first: null
            }
        },
        mounted() {
            if (this.activeChat) {
                this.changeRemote();
            }
        },
        watch: {
            activeChat: function () {this.changeRemote()}
        },
        methods: {
            changeRemote() {
                setRemote(this.remote);
                getAllMessages().then(() => {
                    this.first = this.messages.length - Math.min(this.messages.length, 50);
                    this.customScroll();
                    // document.getElementById("senddiv").scrollIntoView({behavior: "smooth", block: "end"});
                });
            },

            customScroll() {


                    // document.getElementById("overflow").scrollTo({
                    //     top: 99999999999999999999999999999,
                    //     behavior: "smooth"
                    // });
                    document.getElementById(this.shortendMessages[this.shortendMessages.length - 1]._id).scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            },
            revealOlder() {
                const scrollTo = this.shortendMessages[0]._id;
                this.$store.state.scrollWithChat = false;
                this.reveal = this.first < 50 ? this.first : 50;
                this.first = this.first < 50 ? 0 : this.first - 50;
                document.getElementById(scrollTo).scrollIntoView({block: "start"});
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles";

    #overflow {
        overflow-y: scroll;
        height: 88vh;
        padding: 10px;
    }
    #chathistory {
        max-width: 100%;
    }
    .customscroll::-webkit-scrollbar-track {
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        border-radius: 0;
        background-color: rgba(245, 245, 245, 0);
    }
    .customscroll::-webkit-scrollbar {
        width: 5px;
        background-color: #F5F5F5;
    }
    .customscroll::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: $primary;
    }
</style>
