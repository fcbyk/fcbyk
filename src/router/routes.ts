import type { RouteRecordRaw } from 'vue-router'
import { onMounted, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigsStore, useMessageStore } from '@/stores'
import { sleep } from '@/utils'

// 处理正常关键词的函数
async function handleKeywordRoute(keyword: string, query: Record<string, any>): Promise<boolean> {
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
        onMounted(async () => {
          await waitForConfig()
          await defaultRoute()
        })
        return () => null
      }
    })
  },
  {
    // 只匹配一级路径，不允许多级
    path: '/:keyword([^/]+)',
    component: defineComponent({
      setup() {
        const route = useRoute()
        const router = useRouter()

        onMounted(async () => {
          try {
            // 确保配置已加载
            await waitForConfig()
            const matched = await handleKeywordRoute(route.params.keyword as string, route.query)
            await router.push('/')
            if (!matched) {
              await defaultRoute()
            }
          } catch (error) {
            console.error('处理出错:', error)
            await router.push('/')
          }
        })

        return () => null
      }
    })
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default routes