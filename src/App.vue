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

<style lang="postcss" scoped>
.centered {
  @apply flex justify-center items-center h-screen;
}
</style>
