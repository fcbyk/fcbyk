<template>
  <div class="chat-window">

    <div class="title-bar">
      <slot name="title-bar"></slot>
    </div>

    <div class="main">
      <slot name="main"></slot>
    </div>

    <div class="bottom-bar">
      <slot name="bottom-bar"></slot>
    </div>

  </div>
</template>

<style lang="postcss" scoped>
.chat-window {
  @apply absolute rounded-2xl bg-white flex flex-col overflow-hidden;
  width: 50%;
  height: 80%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;

  .title-bar {
    height: 30px;
    border-bottom: 1px solid #f0f0f0;
  }

  .main {
    @apply flex-1 overflow-hidden;
    background-color: rgba(250, 250, 250, 0.9);
  }

  .bottom-bar {
    @apply h-12 flex-shrink-0;
    border-top: 1px solid #f0f0f0;
    background-color: rgba(250, 250, 250, 0.9);
  }
}

@media (max-width: 600px) {
  .chat-window {
    @apply rounded-none w-full h-full;

    .title-bar {
      height: 40px;
    }
  }
}
</style>
