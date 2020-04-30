<template>
  <div id="app">
    <Headbar/>
    <div id="contentDesktop" class="border-top border-primary desktop">
      <ChatList id="chatlistDesktop" class="border-right border-primary customscroll"/>
      <Chatroom style="width: 100%"/>
    </div>
    <div class="border-top border-primary mobile">
      <ChatList class="border-right border-primary customscroll" :mobile="true" v-if="!activeChat"/>
      <Chatroom style="width: 100%" v-else :mobile="true"/>
    </div>

  </div>
</template>

<script>

import ChatList from "@/components/ChatList";
import Headbar from "@/components/Headbar";
import Chatroom from "@/components/Chatroom";
import {mapGetters} from "vuex";
export default {
  name: 'App',
  components: {
    Chatroom,
    Headbar,
    ChatList
  },
  computed: {
    ...mapGetters(["activeChat"])
  }
}
</script>

<style lang="scss">
  @import "styles";
  #chatlistDesktop {
    min-width: 300px;
    width: 25%;
    border-width: medium !important;
    z-index: 7000;
    height: 88vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  #contentDesktop {
    height: 89vh;
    border-width: medium !important;
  }

  @include media-breakpoint-up(md) {
      .desktop {
        display: flex !important;
      }
    .mobile {
      display: none !important;
    }
  }
  @include media-breakpoint-up(sd) {
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }

  #app {
    max-height: 100vh;
    overflow: hidden;
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
