import { defineConfig } from "@/utils"
import { defineStore } from "pinia"
import { ref } from 'vue'
import type { ChatConfig, ChatConfigOptions } from "@/types"

export const useConfigsStore = defineStore('configs', () => {
    const configs = ref<ChatConfig>(defineConfig({}))

    const setConfigs = (config: ChatConfigOptions) => {
        configs.value = defineConfig({
            ...config
        })
    }

    return {
        configs,
        setConfigs
    }
})