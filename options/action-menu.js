import { domain,works,about } from "../qa/index.js"
import createMsgCreator from "../utils/createMsgCreator.js"

const t = createMsgCreator("text")

const m = (label, action = {
    question: t(label),
    answer: [t("服务器繁忙，请稍后再试", 3000)]
}) => ({ label, action, })

export const actionMenu = [
    m("近期规划"),
    m("域名由来", domain),
    {
        label: "关于作者",
        child: [
            m("作品集", works),
            m("自我介绍", about)
        ]
    }
]
