import { createTextMsg as t, createImageMsg as i,defineQA } from "@/utils"

export const domain = defineQA({
    question: t("fcbyk.com这个域名是怎么来的？"),
    answer: [
        t("fcbyk是非常不愉快的拼音首字母", 800),
        t("源于昵称重复，很久之前，我在某APP，取名字", 1000),
        i("https://user-images.githubusercontent.com/101487905/211132451-e4f08849-4ee0-411f-8882-7c84a3862146.gif",2000),
        t("尝试了很多昵称，一直提示重复，最终只有非常不愉快这个昵称通过了系统的唯一性验证", 1500),
        i("https://user-images.githubusercontent.com/101487905/211133219-7f840601-6a2f-4aab-a3d0-e8ab7b189f99.png", 2000),
        t("之后遇到的其他不能重名的APP或游戏，都是优先使用非常不愉快这个昵称。", 1200),
        i("https://user-images.githubusercontent.com/101487905/211133769-74cc86ce-190b-48d7-80ee-4b7b80825734.png", 2000),  
        t("有的时候非常不愉快也会重名，之后慢慢衍生出不愉快，不愉，不是不余这些昵称", 1200),
        t("不知不觉，非常不愉快这个昵称陪伴了我好久，之后也不太想改", 800),
        t("不愉快，在这里，没有emo和负能量的意思", 800)
    ],
})