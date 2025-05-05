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
            h(`<a href="https://github.com/fcbyk" class="custom-link" target="_blank">
                github.com/fcbyk
                </a>`, 1000)
        ]
}