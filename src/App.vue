<template>
  <div id="app">
    <Headbar/>
    <div id="content" class="border-top border-primary desktop">
      <ChatList id="chatlistDesktop" class="border-right border-primary"/>
    </div>
    <div class="border-top border-primary mobile">
      <ChatList class="border-right border-primary" :mobile="true"/>
    </div>

  </div>
</template>

<script>

import ChatList from "@/components/ChatList";
import Headbar from "@/components/Headbar";
export default {
  name: 'App',
  components: {
    Headbar,
    ChatList
  }
}
</script>

<style lang="scss">
  @import "styles";
  #chatlistDesktop {
    height: 89vh;
    min-width: 300px;
    width: 25%;
    border-width: medium !important;
  }

  #contentDesktop {
    border-width: medium !important;
  }

  @include media-breakpoint-up(md) {
      .desktop {
        display: block !important;
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

</style>
