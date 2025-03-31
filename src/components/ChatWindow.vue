<template>
  <div class="chat-window">

    <div class="title-bar">
      <slot name="title-bar"></slot>
    </div>

    <div class="main">
      <slot name="main"></slot>
    </div>

  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped>
.chat-window {
  @apply absolute;
  @apply w-[50vw] h-[80vh] rounded-2xl;
  @apply bg-white;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;

  .title-bar {
    @apply pointer-events-auto whitespace-nowrap;
    @apply overflow-hidden cursor-move box-border;
    @apply text-[#333] text-center text-[14px] leading-[30px];
    @apply pr-[80px] pl-[120px] h-[30px] rounded-t-2xl; ;
    border-bottom: 1px solid #f0f0f0;
    background: rgba(250, 250, 250, 0.9);
  }
}

@media (max-width: 600px) {
  .chat-window {
    @apply w-[100vw] h-[100vh] rounded-none;
  }
}
</style>
