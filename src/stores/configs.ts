import { defineConfig } from "@/config"
import { defineStore } from "pinia"
import { ref } from 'vue'
import type { ChatConfig, ChatConfigOptions } from "@/types"

export const useConfigsStore = defineStore('configs', () => {
    const configs = ref<ChatConfig>(defineConfig({}))
    const isConfigLoaded = ref(false)

    const setConfigs = (config: ChatConfigOptions) => {
        configs.value = defineConfig({
            ...config
        })
        isConfigLoaded.value = true
    }

    return {
        configs,
        isConfigLoaded,
        setConfigs
    }
})