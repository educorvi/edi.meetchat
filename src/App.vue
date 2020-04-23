<template>
  <div id="app">
    <Headbar/>
    <div id="contentDesktop" class="border-top border-primary desktop">
      <ChatList id="chatlistDesktop" class="border-right border-primary"/>
      <Chatroom style="width: 100%"/>
    </div>
    <div class="border-top border-primary mobile">
      <ChatList class="border-right border-primary" :mobile="true"/>
    </div>

  </div>
</template>

<script>

import ChatList from "@/components/ChatList";
import Headbar from "@/components/Headbar";
import Chatroom from "@/components/Chatroom";
export default {
  name: 'App',
  components: {
    Chatroom,
    Headbar,
    ChatList
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
  }

</style>
