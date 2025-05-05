import { createMessageCreator } from "@/utils"
import type { MessageConfig } from "@/types"

const text = createMessageCreator("text")
const file = createMessageCreator("file")

export const keywordReply: { [key: string]: MessageConfig[] } = {
    "网易云": [text("音乐组件存在bug，等待修复中", 1000)],
    "键盘测试": [file({
        fileName: "KB2_105.exe",
        fileSize: '645 KB',
        fileType: "exe",
        fileUrl: "https://github.com/fcbyk/fcbyk/releases/download/files/KB2_105.exe"
    })]
}
