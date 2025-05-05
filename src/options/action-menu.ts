import { domain, works, about } from '@/qa'
import { createMenuItem as m } from '@/utils'
import type { ActionMenu, ActionMenuItemBase } from '@/types'

const mc = (label: string, child: ActionMenuItemBase[]) => ({ label, child })

export const actionMenu: ActionMenu = [
    m("近期规划"),
    m("域名由来", domain),
    mc("关于作者",
        [
            m("作品集", works),
            m("自我介绍", about)
        ]
    )
]