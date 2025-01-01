<template>
  <div class="start">
    <span ref="typed"></span>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Typed from 'typed.js';

const typed = ref(null);

onMounted(() => {
  new Typed(typed.value, {
    strings: ["正在构建项目..."],
    typeSpeed: 50,
    startDelay: 500,
    smartBackspace: false,
  });
});
</script>

<style lang="scss" scoped>
.start {
  margin: 1rem;
}
</style>
