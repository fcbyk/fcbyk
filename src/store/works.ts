import { text } from "@/utils/createMsg"
import defineQA from "@/utils/defineQA"

export default defineQA({
    question: text("你写过哪些项目"),
    answer: [
        text("可以在GitHub访问我写过的项目噢", 1500),
        text(`<a href="https://github.com/fcbyk" 
            class="text-[#576b95]
             hover:text-[#475f8c]
             hover:underline 
             transition-colors 
             duration-200">
             github.com/fcbyk
             </a>`, 1000)
    ]
})