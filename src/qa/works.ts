import { createMessageCreator } from '@/utils'
import type { QA } from '@/types'

const t = createMessageCreator("text")
const h = createMessageCreator("html")

export const works: QA = 
{
    question: t("你写过哪些项目"),
    answer: 
    [
        t("可以在GitHub访问我写过的项目噢", 1500),
        h(`<a href="https://github.com/fcbyk" 
            class="text-[#576b95]
             hover:text-[#475f8c]
                hover:underline 
                transition-colors 
             duration-200" target="_blank">
             github.com/fcbyk
             </a>`, 1000)
    ]
}