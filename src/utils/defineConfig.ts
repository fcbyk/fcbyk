import { ChatConfig, ChatConfigOptions } from "@/types";
import { createMenuItem as m } from "@/utils";

export const defineConfig = (options: ChatConfigOptions): ChatConfig => ({

    name: '非常不愉快',

    timeThreshold: 1000 * 60 * 5,

    cliPrint: ["非常不愉快.com"],

    avatar: {
        me: 'https://avatars.githubusercontent.com/u/101487905',
        user: 'https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png'
    },

    actionMenu: [
        m("菜单未设置")
    ],

    // 属性覆盖
    ...options
}) satisfies ChatConfig;