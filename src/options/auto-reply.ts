import { createMessageCreator } from "@/utils"
import type { MessageConfig } from "@/types"

const text = createMessageCreator("text")

export const autoReply: MessageConfig[][] = [
    [text("⚠️ 404_Response_From_Server", 1000),],
    [text("服务器繁忙，请稍后再试", 3000)],
    [text("正在从火星数据中心同步...", 1500)],
    [text("⚠️ 程序员正在和bug搏斗中", 2000)],
    [text("服务器正在思考人生...请等待42毫秒", 1000)],
    [text("您的请求已被加入区块链，等待矿工确认⛏️", 2500)],
    [text("To be replied, or not to be replied...", 1800)],
    [text("正在为您翻山越岭⛰️...但服务器有点恐高", 2200)],
    [text("从前有台服务器...它响应得有点慢", 1500)],
    [text("等待是美好的，因为它预示着回复即将到来", 3000)],
    [text("⌛ 加载中... 99% (别信这个进度条)", 2000)],
    [text("您获得了【耐心等待】成就 +10XP", 2500)],
    [text("服务器正在团战中，请稍候...", 1800)],
    [text("需要更多矿(资)石(源)来建造回复", 1500)],
    [text("服务器正在喝咖啡提神☕...", 1200)],
    [text("您的留言正在排队，前面还有3只树懒", 3000)],
    [text("我们的信鸽正在路上🕊️...", 2000)],
    [text("服务器说它需要5分钟冥想时间", 1500)],
    [text("正在通过量子隧道传输数据...", 2500)],
    [text("来自未来的回复正在时间旅行中⏳", 1800)],
    [text("警告：检测到时空扭曲，响应延迟", 1500)]
]
