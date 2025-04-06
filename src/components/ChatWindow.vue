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
  @apply absolute flex flex-col overflow-hidden;
  @apply rounded-2xl;
  background-color: rgb(250 250 250 / var(--tw-bg-opacity, 1));
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
  width: 50%;
  height: 80%;

  .title-bar {
    @apply flex-shrink-0 h-[30px];
    border-bottom: 1px solid #aeaeae32;
  }

  .main {
    @apply flex-1 overflow-hidden;
  }

  .bottom-bar {
    @apply flex-shrink-0;
  }
}

@media (max-width: 600px) {
  .chat-window {
    @apply rounded-none w-full h-full bg-[#ededed];
    
    .title-bar {
      @apply h-[35px];
      border-bottom:none;
      box-shadow: 0 0.5px 0.5px rgba(0, 0, 0, 0.03)
    }
  }
}
</style>
