import { text } from "@/utils/createMsg"
import defineQA from "@/utils/defineQA"

export default defineQA({
    question: text("fcbyk.com这个域名是怎么来的？"),
    answer: [
        text("fcbyk是非常不愉快的拼音首字母", 800),
        text("源于昵称重复，很久之前，我在某APP，取名字",800),
        text("尝试了很多昵称，一直提示重复，最终只有非常不愉快这个昵称通过了系统的唯一性验证", 1000),
        text("之后遇到的其他不能重名的APP或游戏，都是优先使用非常不愉快这个昵称。", 1000),
        text("有的时候非常不愉快也会重名，之后慢慢衍生出不愉快，不愉，不是不余这些昵称",1000),
        text("不知不觉，非常不愉快这个昵称陪伴了我好久，之后也不太想改",800),
        text("不愉快，在这里，没有emo和负能量的意思",800)
    ],
})