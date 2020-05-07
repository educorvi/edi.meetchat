<template>
    <div>
        <div id="chathistory" v-show="activeChat && (first || first === 0)">
            <div v-if="mobile" class="p-2" id="mobileHeader">
                <b-button @click="$store.commit('setActiveChat', null)">Zurück</b-button>
                <h4 class="p-0 m-0" style="color: #f3f3f3">{{activeChat.name}}</h4>
                <b-button>Infos</b-button>
            </div>
            <div id="overflow" class="customscroll">
                <b-button v-if="first>0" @click="revealOlder" style="width: 100%;">Ältere Nachrichten</b-button>
                <transition-group name="chat" @after-enter="customScroll">
                    <Chatmessage :id="message._id+mobile" v-for="message in shortendMessages" :user="user"
                                 :key="message.user+new Date(message.time).toISOString()"
                                 :message="message"></Chatmessage>
                </transition-group>
            </div>
            <div id="sendbarWrapper">
                <div id="sendbar">
                    <chatsend-bar @send="send"/>
                </div>
            </div>

        </div>
        <div v-if="activeChat && !(first || first === 0)">
            <custom-spinner/>
        </div>
    </div>
</template>

<script>
    /* eslint-disable vue/no-unused-components */

    import {mapGetters} from "vuex"
    import {getAllMessages, putMessage, setRemote} from "@/database";
    import Chatmessage from "@/components/chatroomComponents/Chatmessage";
    import ChatsendBar from "@/components/chatroomComponents/chatsendBar";
    import CustomSpinner from "@/components/CustomSpinner";

    export default {
        name: "Chatroom",
        components: {CustomSpinner, ChatsendBar, Chatmessage},
        props: {
            mobile: {
                type: Boolean,
            }
        },
        computed: {
            ...mapGetters(["activeChat", "messages"]),
            shortendMessages() {
                return this.messages ? this.messages.slice(this.first, this.messages.length) : []
            },
            remote() {
                return this.activeChat.url
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
            activeChat: function () {
                this.changeRemote()
            },
            messages: function (newVal, oldVal) {
                if (newVal.length === oldVal.length + 1) {
                    const bing = new Audio("bing.mp3")
                    bing.play();
                }
            }
        },
        methods: {
            changeRemote() {
                console.log("Change Remote")
                setRemote(this.remote);
                console.log("get Messages")
                getAllMessages().then(() => {
                    this.first = this.messages.length - Math.min(this.messages.length, 50);
                    this.customScroll();
                    console.log("Success")
                    // document.getElementById("senddiv").scrollIntoView({behavior: "smooth", block: "end"});
                }).catch(err => console.error(err));
            },

            customScroll() {
                if (this.reveal === 0) {
                    document.getElementById(this.shortendMessages[this.shortendMessages.length - 1]._id + this.mobile).scrollIntoView({
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
            async send(p) {
                const time = await this.getServerTime() || new Date();
                putMessage({
                    user: this.user,
                    text: p,
                    time
                })
            },

            async getServerTime() {
                const res = await this.http.get("https://time.jp-studios.de");
                //Das erste replace entfernt den Wochentag, das zweite den Zeitzonennamen, damit der String für Date lesbar ist
                const date = res.data.replace(/([A-Za-z]+), /, "").replace(/ [A-Z]{3,4}/, "")
                return new Date(date);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../styles";

    #overflow {
        overflow-y: scroll;
        height: 100%;
        padding: 12px 12px;

    }

    #chathistory {
        max-width: 100%;
        height: 78vh;
        padding-bottom: 80px;
    }

    #mobileHeader {
        display: flex;
        vertical-align: center;
        justify-content: space-between;
        background-color: $primary;
    }

    #sendbarWrapper {
        background-color: white;
        position: absolute;
        max-height: 50px;
        bottom: 0;
        left: 0;
        width: 95%;
        margin-right: 5%;
        display: flex;
        justify-content: end;
    }

    @include media-breakpoint-up(md) {
        #senddiv {
            margin-left: 300px;
        }
        #chathistory {
            height: 88vh;
        }
    }

    #sendbar {
        padding-bottom: 10px;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>
