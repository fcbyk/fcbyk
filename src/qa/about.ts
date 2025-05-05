import { createMessageCreator } from '@/utils'
import type { QA } from '@/types'

const t = createMessageCreator("text")

export const about: QA = 
{
    question: t("可以介绍一下你自己吗"),
    answer: 
    [
        t("还没想好怎么介绍自己", 1500),
        t("挺遗憾的，毕业后，没从事计科相关的工作", 1500),
        t("2025年，正在努力通过计科变现", 1500),
        t("目前是一名少儿编程老师，教Scratch、C++", 1500),
    ],
}