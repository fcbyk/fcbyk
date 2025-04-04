<template>
  <button class="btn-1"></button>
  <button class="btn-2"></button>
  <button class="btn-3"></button>
  <div class="title">{{ displayText }}</div>
</template>

<script lang="ts" setup>
import { useMessageStore } from '@/stores';
import { computed } from 'vue'
import { useHead } from '@vueuse/head'

const msgStore = useMessageStore()
const displayText = computed(() => msgStore.isTyping ? '正在输入...' : '非常不愉快')
useHead({ title: displayText })
</script>

<style lang="scss" scoped>
@mixin btn($left, $color) {
  position: absolute;
  top: 7.5px;
  left: $left;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: $color;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-1 {
  @include btn(15px, #ff5f57);
}

.btn-2 {
  @include btn(35px, #ffbd2e);
}

.btn-3 {
  @include btn(55px, #28c840);
}

.title {
  display: none;
}
</style>