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
import { useMessageStore, useConfigsStore } from '@/stores'
import { useMenuNavigation, useMenuState, useClickOutside } from '@/utils'
import type { ActionMenuItem, ActionMenuItemBase } from '@/types'

const configsStore = useConfigsStore()
const menu = configsStore.configs.actionMenu as ActionMenuItem[]

const { isTyping, questionAnswer} = useMessageStore()

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

useClickOutside(() => menuState.close())
</script>

<style lang="postcss" scoped>
.action-menu-wrapper {
  @apply relative w-full select-none;

  .action-menu-container {
    @apply flex w-full h-full text-center relative min-h-[50px];

    .menu-item {
      @apply flex-1 cursor-pointer transition-all duration-300 flex items-center justify-center relative;
      @apply py-3 bg-[var(--my-message-bg)];
      border-left: 1px solid var(--border-color);

      &:hover {
        @apply text-[var(--text-primary)];
      }

      &:not(:last-child) {
        @apply border-r-0;
      }

      &.has-child.active {
        @apply text-[var(--text-primary)];

        .menu-arrow {
          @apply rotate-180;
        }
      }

      .menu-arrow {
        @apply ml-1 text-xs transition-transform duration-200;
      }

      .sub-menu-container {
        @apply absolute bottom-[110%] max-w-[98%] min-w-[80%] bg-[var(--my-message-bg)];
        @apply border border-[var(--border-color)] rounded-lg shadow-lg z-10 overflow-hidden;
        box-shadow: 0 -4px 12px var(--shadow-light);

        .sub-menu-item {
          @apply px-3 py-3 text-center cursor-pointer transition-colors duration-200;
          @apply border-b border-[var(--border-color)];

          &:hover {
            @apply text-[var(--text-primary)];
          }

          &:last-child {
            @apply border-b-0;
          }
        }
      }
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  @apply opacity-0 translate-y-2.5;
}
</style>