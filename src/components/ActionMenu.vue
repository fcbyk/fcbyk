<template>
  <div class="action-menu-container">
    <div v-for="(item, index) in menu" :key="index" class="menu-item" @click="handleClick(item, index)">
      {{ item }}
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  menu: {
    type: Array,
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['menu-click'])

const handleClick = (item, index) => {
  emit('menu-click', { item, index })
}
</script>

<style lang="postcss" scoped>
.action-menu-container {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
}

.menu-item {
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  @apply flex items-center justify-center;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

.menu-item:not(:last-child) {
  border-right: none;
}
</style>