<template>
  <div class="gradient-background" :style="gradientStyle"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  colors?: string[];
  duration?: number;
  angle?: number;
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => ['#ff9a9e', '#fad0c4', '#fad0c4', '#a18cd1', '#fbc2eb'],
  duration: 15,
  angle: 45
});

const gradientStyle = computed(() => {
  const colorStops = props.colors.map((color: string, index: number) => {
    const percentage = (index / (props.colors.length - 1)) * 100;
    return `${color} ${percentage}%`;
  }).join(', ');

  return {
    background: `linear-gradient(${props.angle}deg, ${colorStops})`,
    backgroundSize: '400% 400%',
    animation: `gradientBG ${props.duration}s ease infinite`
  };
});
</script>

<style scoped>
.gradient-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>