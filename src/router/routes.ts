import type { RouteRecordRaw } from 'vue-router'
import { onMounted, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigsStore, useMessageStore } from '@/stores'
import { sleep } from '@/utils'

// 处理关键词的函数
async function handleKeywordRoute(keyword: string): Promise<boolean> {
  const configsStore = useConfigsStore()
  const config = configsStore.configs
  const messageStore = useMessageStore()
  if (Object.keys(config.urlReply).includes(keyword)) {
    messageStore.questionAnswer(config.urlReply[keyword])
    return true
  }
  return false
}

// 默认函数
async function defaultRoute() {
  const configsStore = useConfigsStore()
  const messageStore = useMessageStore()

  if (messageStore.messageList.length === 0)
    await messageStore.answer(configsStore.configs.hello)
}

// 等待配置加载完成
async function waitForConfig(): Promise<void> {
  const configsStore = useConfigsStore()
  const messageStore = useMessageStore()
  
  if (!configsStore.isConfigLoaded) {
    // 如果配置未加载，等待一段时间后重试
    await sleep(100)
    return waitForConfig()
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: defineComponent({
      setup() {
        const route = useRoute()
        onMounted(async () => {
          try {
            await waitForConfig()
            // 检查是否有查询参数
            const keyword = route.query.qa as string
            if (keyword) {
              const matched = await handleKeywordRoute(keyword)
              if (!matched) await defaultRoute()
            } else await defaultRoute()
          } catch (error) {
            console.error('处理出错:', error)
            await defaultRoute()
          }
        })

        return () => null
      }
    })
  }
]

export default routes