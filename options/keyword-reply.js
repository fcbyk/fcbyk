import createMsgCreator from "../utils/createMsgCreator.js"

const text = createMsgCreator("text")

export const keywordReply = {
    "网易云": [text("音乐组件存在bug，等待修复中", 1000)],
    "键盘测试": [text("下载组件还未写，还在开发中", 2000)]
}