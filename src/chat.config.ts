import domain from "./store/domain"
import works from "./store/works"
import about from "./store/about"
import { text } from "./utils/createMsg"

const menu = (label: string, action: QA = {
    question: text(label),
    answer: [text("服务器繁忙，请稍后再试", 3000)]
}) => ({
    label,
    action,
})

export default {

    // 昵称设置
    name: '非常不愉快',

    // 头像设置
    avatar: {
        me: 'https://ss2.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3315366793,2321372572&fm=253&gp=0.jpg',
        user: 'https://pic1.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_xs.jpg'
    },

    // 隔多久显示一次时间
    timeThreshold: 1000 * 60 * 5, // 5分钟


    actionMenu: [
        menu("域名由来", domain),
        menu("近期规划"),
        {
            label: "关于作者",
            child: [
                menu("作品集", works),
                menu("自我介绍",about)
            ]
        }
    ]
} as chatConfig