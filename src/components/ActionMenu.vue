<template>
  <div class="action-menu-wrapper">
    <div class="action-menu-container">
      <div v-for="(item, index) in menu" :key="index" class="menu-item" @click.stop="handleItemClick(item, index)"
        :class="{ 'has-child': itemHasChildren(item), 'active': activeMenuIndex === index }">
        {{ item.label }}
        <span v-if="itemHasChildren(item)" class="menu-arrow">▼</span>

        <transition name="slide-up">
          <div v-if="itemHasChildren(item) && activeMenuIndex === index" class="sub-menu-container" @click.stop>
            <div v-for="(childItem, childIndex) in getChildren(item)" :key="childIndex" class="sub-menu-item"
              @click="handleChildClick(childItem, index)">
              {{ childItem.label }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, onMounted, onUnmounted } from 'vue'
import { SendMessage } from '@/utils';
import chatConfig from '@/configs'
import { QA } from '@/types';

type ActionMenuItemBase = {
  label: string;
  action: QA;
};

type ActionMenuItemWithChildren = {
  label: string;
  child: {
    label: string;
    action: QA;
  }[];
  action?: never;
};

type ActionMenuItem = ActionMenuItemBase | ActionMenuItemWithChildren;

const menu = chatConfig.actionMenu as ActionMenuItem[];
const isSending: any = inject('isSending')
const messageHistory: any = inject('messages')
const sendMessage = new SendMessage(messageHistory)

// 当前激活的菜单索引
const activeMenuIndex = ref<number | null>(null)

// 检查菜单项是否有子项
const itemHasChildren = (item: ActionMenuItem): item is ActionMenuItemWithChildren => {
  return 'child' in item && item.child?.length > 0
}

// 获取子菜单项
const getChildren = (item: ActionMenuItem) => {
  return itemHasChildren(item) ? item.child : []
}

// 处理菜单项点击
const handleItemClick = (item: ActionMenuItem, index: number) => {
  // 如果点击的是当前已打开的菜单，则关闭它
  if (activeMenuIndex.value === index) {
    activeMenuIndex.value = null
    return
  }

  // 如果有子菜单，则展开/切换
  if (itemHasChildren(item)) {
    activeMenuIndex.value = index
    return
  }

  if (isSending.value) return

  // 如果没有子菜单，直接执行动作
  handleAction(item)
}

// 处理子菜单项点击
const handleChildClick = (childItem: { label: string; action: QA }, parentIndex: number) => {
  activeMenuIndex.value = null // 关闭子菜单
  handleAction(childItem)
}

// 执行动作
const handleAction = async (item: { action: QA }) => {
  if (isSending.value) return

  try {
    isSending.value = true

    await sendMessage.userSendMessage(item.action.question.content)

    for (const element of item.action.answer) {
      await sendMessage.meSendMessage(element.content, element.loadingTime)
    }
  } finally {
    isSending.value = false
  }
}

// 点击页面其他地方关闭菜单
const handleClickOutside = () => {
  activeMenuIndex.value = null
}

// 添加全局点击事件监听
onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  isSending.value = true
  await sendMessage.meSendMessage("你好！我是不愉，你有什么要问我的吗？", 1000)
  isSending.value = false
})

// 移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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