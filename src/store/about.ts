import { text } from "@/utils/createMsg"
import defineQA from "@/utils/defineQA"

export default defineQA({
    question: text("可以介绍一下你自己吗"),
    answer: [
        text("还没想好怎么介绍自己", 1500),
        text("挺遗憾的，毕业后，没从事计科相关的工作", 1500),
        text("2025年，正在努力通过计科变现", 1500),
    ],
})