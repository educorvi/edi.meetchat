<template>
    <div id="chathistory" v-show="activeChat && (first || first === 0)">
        <div id="overflow" class="customscroll">
            <b-button v-if="first>0" @click="revealOlder" style="width: 100%;">Ältere Nachrichten</b-button>
            <transition-group name="chat" @after-enter="customScroll">
                <Chatmessage :id="message._id" v-for="message in shortendMessages" :user="user"
                   :key="message.user+new Date(message.time).toISOString()" :message="message"></Chatmessage>
            </transition-group>
        </div>
            <div id="sendbarWrapper">
                <div id="sendbar">
                    <chatsend-bar @send="send"/>
                </div>
            </div>

    </div>
</template>

<script>
    /* eslint-disable vue/no-unused-components */

    import {mapGetters} from "vuex"
    import {setRemote, getAllMessages, putMessage} from "@/database";
    import Chatmessage from "@/components/chatroomComponents/Chatmessage";
    import ChatsendBar from "@/components/chatroomComponents/chatsendBar";

    export default {
        name: "Chatroom",
        components: {ChatsendBar, Chatmessage},
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
                user: "Julian Pollinger_julian.pollinger@jp-studios.de",
                first: null,
                reveal: 0
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
                if (this.reveal === 0) {
                    document.getElementById(this.shortendMessages[this.shortendMessages.length - 1]._id).scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                } else {
                    this.reveal--;
                }

            },
            revealOlder() {
                const scrollTo = this.shortendMessages[0]._id;
                this.$store.state.scrollWithChat = false;
                this.reveal = this.first < 50 ? this.first : 50;
                this.first = this.first < 50 ? 0 : this.first - 50;
                document.getElementById(scrollTo).scrollIntoView({block: "start"});
            },
            send(p) {
                putMessage({
                    user: this.user,
                    text: p,
                    time: new Date()
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles";

    #overflow {
        overflow-y: scroll;
        height: 88vh;
        padding: 12px 12px 50px;
    }
    #chathistory {
        max-width: 100%;
    }

    #app {

    }

    #sendbarWrapper {
        background-color: white;
        position: absolute;
        max-height: 50px;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: end;
    }
    #sendbar {
        padding-bottom: 10px;
        width: 100%;
        margin-left: 300px;
        display: flex;
        justify-content: center;
    }
</style>
