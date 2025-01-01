<template>
  <div class="chat-window">
    <slot name="title-bar"></slot>
    <slot name="main"></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.chat-window {
  position: absolute;
  width: 50vw;
  height: 80vh;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

@media (max-width: 600px) {
  .chat-window {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
