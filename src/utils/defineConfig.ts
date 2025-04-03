import { ChatConfig } from "@/types";

export const defineConfig = (options: ChatConfig): ChatConfig => ({

    name: '非常不愉快',

    timeThreshold: 1000 * 60 * 5,

    cliPrint:["非常不愉快.com"],

    // 属性覆盖
    ...options
}) satisfies ChatConfig;