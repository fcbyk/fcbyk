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
  @apply absolute;
  @apply rounded-2xl;
  @apply bg-white;
  @apply flex flex-col;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 80%;
  width: 50%;

  .title-bar {
    @apply pointer-events-auto whitespace-nowrap;
    @apply overflow-hidden cursor-move box-border;
    @apply text-[#333] text-center text-[14px] leading-[30px];
    @apply h-[30px] rounded-t-2xl ;
    border-bottom: 1px solid #f0f0f0;
    background: rgb(250, 250, 250);
    flex-shrink: 0;
  }

  .main {
    background-color: rgba(250, 250, 250, 0.9);
    flex: 1 1 auto;
    overflow: hidden
  }


  .bottom-bar {
    @apply w-full h-12;
    border-top: 1px solid #f0f0f0;
    background-color: rgb(250, 250, 250);
    flex-shrink: 0;
  }
}

@media (max-width: 600px) {
  .chat-window {
    @apply rounded-none;
    width: 100%;
    height: 100%;
    .title-bar{
      height: 40px;
      border-bottom: 1px solid #f5f5f5;
      background-color: rgba(250, 250, 250, 0.9);
    }
  }
}
</style>
