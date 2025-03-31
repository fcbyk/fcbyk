<script setup>
import ChatWindow from './components/ChatWindow.vue';
import TitleBar from './components/TitleBar.vue';
import Message from './components/Message.vue';
import ActionMenu from '@/components/ActionMenu.vue'
import menu from './data/menu';

const handleMenuClick = ({ item, index }) => {
  console.log(`点击了 ${item}，索引 ${index}`)
}
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

      <template #bottom-bar>
        <ActionMenu :menu @menu-click="handleMenuClick" />
      </template>
    </chat-window>
  </div>
</template>

<style lang="postcss" scoped>
.centered {
  @apply flex justify-center items-center h-screen;
}
</style>
