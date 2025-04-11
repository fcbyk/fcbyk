import createMsgCreator from "../utils/createMsgCreator.js"

const t = createMsgCreator("text")
const h = createMsgCreator("html")

export const works = {
    question: t("你写过哪些项目"),
    answer: [
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