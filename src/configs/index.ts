import * as qa from "./qa";
import { createMenuItem as m, defineConfig } from "../utils"
import musicList from './json/musicList.json'

export default defineConfig({

    avatar: {
        me: 'https://ss2.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3315366793,2321372572&fm=253&gp=0.jpg',
        user: 'https://pic1.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_xs.jpg'
    },

    actionMenu: [
        m("近期规划"),
        m("域名由来", qa.domain),
        {
            label: "关于作者",
            child: [
                m("作品集", qa.works),
                m("自我介绍", qa.about)
            ]
        }
    ],

    cliPrint: [
        '%c👻 发现秘密！\n%c要看看该项目的屎山代码吗，欢迎PR → %chttps://github.com/fcbyk/fcbyk',
        'font-size:16px',
        'color:#666',
        'color:#1890ff; text-decoration:underline'
    ],

    musicList
})