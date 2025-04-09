import domain from "../qa/domain.js"
import works from "../qa/works.js"
import about from "../qa/about.js"

const m = (label, action) => ({ label, action })

export default [
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