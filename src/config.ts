import { ChatConfig, ChatConfigOptions } from "@/types";
import { createMenuItem as m } from "@/utils";
import { createMessageCreator } from "@/utils";

const text = createMessageCreator("text");

export const defineConfig = (options: ChatConfigOptions): ChatConfig => ({

    name: '非常不愉快',

    hello: [
        text("你好！我是不愉，你有什么要问我的吗？", 1000)
    ],

    autoReply: [
        [text("⚠️ 404_Response_From_Server", 1000),],
        [text("服务器繁忙，请稍后再试", 3000)]
    ],

    keywordReply: {
        "网易云": [text("音乐组件存在bug，等待修复中", 1000)],
        "不愉快": [text("在", 1000)],
    },

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