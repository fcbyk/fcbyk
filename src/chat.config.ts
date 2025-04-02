import domain from "./store/domain"
import works from "./store/works"
import about from "./store/about"

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
        {
            label: "域名由来",
            action: domain
        },
        {
            label: "作品集",
            action: works
        },
        {
            label: "关于作者",
            action: about
        }
    ]
} as chatConfig