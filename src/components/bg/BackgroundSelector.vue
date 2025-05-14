<template>
  <component :is="currentBackground" v-bind="config.background.props" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defineConfig } from '@/config';
import FlowingGradientBackground from './FlowingGradientBackground.vue';
import WaveBackground from './WaveBackground.vue';

const config = defineConfig({});

const currentBackground = computed(() => {
  switch (config.background.type) {
    case 1:
      return FlowingGradientBackground;
    case 2:
      return WaveBackground;
    default:
      return WaveBackground;
  }
});
</script> 