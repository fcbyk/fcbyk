import { ChatConfig, ChatConfigOptions } from "@/types";
import { createMenuItem as m } from "@/utils";
import { createMessageCreator } from "@/utils";

const text = createMessageCreator("text");

export const defineConfig = (options: ChatConfigOptions): ChatConfig => ({

    name: '非常不愉快',

    hello:[
        text("你好！我是不愉，你有什么要问我的吗？", 1000)
    ],

    timeThreshold: 1000 * 60 * 5,

    cliPrint: ["hello world"],

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