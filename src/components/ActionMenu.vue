<template>
  <div class="action-menu-wrapper">
    <div class="action-menu-container">
      <div v-for="(item, index) in menu" :key="index" class="menu-item" @click.stop="handleItemClick(item, index)"
        :class="{
          'has-child': isExpandable(item),
          'active': menuState.isOpen(index)
        }">
        {{ item.label }}
        <span v-if="isExpandable(item)" class="menu-arrow">▼</span>

        <transition name="slide-up">
          <div v-if="isExpandable(item) && menuState.isOpen(index)" class="sub-menu-container" @click.stop>
            <div v-for="(childItem, childIndex) in getChildItems(item)" :key="childIndex" class="sub-menu-item"
              @click="handleChildClick(childItem)">
              {{ childItem.label }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import { useMenuNavigation, useMenuState, useClickOutside } from '@/utils'
import { onMounted } from 'vue'
import chatConfig from '@/configs'
import type { ActionMenuItem, ActionMenuItemBase } from '@/types'

const menu = chatConfig.actionMenu as ActionMenuItem[]
const { isTyping, questionAnswer, init: msgListInit } = useMessageStore()

const menuState = useMenuState()
const { getChildItems, isExpandable } = useMenuNavigation()

const handleItemClick = (item: ActionMenuItem, index: number) => {
  if (isExpandable(item)) {
    menuState.toggle(index)
    return
  }

  if (isTyping) return
  questionAnswer(item.action)
}

const handleChildClick = (childItem: ActionMenuItemBase) => {
  menuState.close()
  questionAnswer(childItem.action)
}

onMounted(() => msgListInit())
useClickOutside(() => menuState.close())
</script>

<style lang="postcss" scoped>
.action-menu-wrapper {
  position: relative;
  width: 100%;
}

.action-menu-container {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
}

.menu-item {
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  @apply flex items-center justify-center relative;
  padding: 12px 0;
  background-color: white;
  position: relative;
}

.menu-item:hover {
  color: rgba(0, 0, 0, 0.8);
}

.menu-item:not(:last-child) {
  border-right: none;
}

.menu-item.has-child.active {
  color: rgba(0, 0, 0, 0.8);
}

.menu-arrow {
  margin-left: 4px;
  font-size: 12px;
  transition: transform 0.2s;
}

.menu-item.has-child.active .menu-arrow {
  transform: rotate(180deg);
}

.sub-menu-container {
  position: absolute;
  bottom: 110%;
  max-width: 98%;
  min-width: 80%;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
}

.sub-menu-item {
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f3f4f6;
}

.sub-menu-item:hover {
  color: rgba(0, 0, 0, 0.8);
}

.sub-menu-item:last-child {
  border-bottom: none;
}

/* 动画效果 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>