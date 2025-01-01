<script setup>
import ChatWindow from './components/ChatWindow.vue';
import TitleBar from './components/TitleBar.vue';
import Message from './components/Message.vue';
</script>

<template>
  <div class="centered">
    <chat-window>

      <template #title-bar>
        <title-bar></title-bar>
      </template>

      <template #main>
        <message></message>
      </template>
    </chat-window>
  </div>
</template>

<style lang="scss" scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
