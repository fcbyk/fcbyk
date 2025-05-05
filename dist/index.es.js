const h = (o, c, i = 0) => {
  if (!c) throw new Error("消息不能为空");
  return { type: o, content: c, loadingTime: i };
}, t = (o) => (c, i) => h(o, c, i), b = t("text"), r = (o, c = {
  question: b(o),
  answer: [b("服务器繁忙，请稍后再试", 3e3)]
}) => ({ label: o, action: c }), s = t("text"), a = t("image"), f = {
  question: s("fcbyk.com这个域名是怎么来的？"),
  answer: [
    s("fcbyk是非常不愉快的拼音首字母", 800),
    s("源于昵称重复，很久之前，我在某APP，取名字", 1e3),
    a("https://user-images.githubusercontent.com/101487905/211132451-e4f08849-4ee0-411f-8882-7c84a3862146.gif", 2e3),
    s("尝试了很多昵称，一直提示重复，最终只有非常不愉快这个昵称通过了系统的唯一性验证", 1500),
    a("https://user-images.githubusercontent.com/101487905/211133219-7f840601-6a2f-4aab-a3d0-e8ab7b189f99.png", 2e3),
    s("之后遇到的其他不能重名的APP或游戏，都是优先使用非常不愉快这个昵称。", 1200),
    a("https://user-images.githubusercontent.com/101487905/211133769-74cc86ce-190b-48d7-80ee-4b7b80825734.png", 2e3),
    s("有的时候非常不愉快也会重名，之后慢慢衍生出不愉快，不愉，不是不余这些昵称", 1200),
    s("不知不觉，非常不愉快这个昵称陪伴了我好久，之后也不太想改", 800),
    s("不愉快，在这里，没有emo和负能量的意思", 800)
  ]
}, n = t("text"), l = {
  question: n("可以介绍一下你自己吗"),
  answer: [
    n("还没想好怎么介绍自己", 1500),
    n("挺遗憾的，毕业后，没从事计科相关的工作", 1500),
    n("2025年，正在努力通过计科变现", 1500),
    n("目前是一名少儿编程老师，教Scratch、C++", 1500)
  ]
}, u = t("text"), p = t("html"), g = {
  question: u("你写过哪些项目"),
  answer: [
    u("可以在GitHub访问我写过的项目噢", 1500),
    p(`<a href="https://github.com/fcbyk" 
            class="text-[#576b95]
             hover:text-[#475f8c]
                hover:underline 
                transition-colors 
             duration-200" target="_blank">
             github.com/fcbyk
             </a>`, 1e3)
  ]
}, m = (o, c) => ({ label: o, child: c }), d = [
  r("近期规划"),
  r("域名由来", f),
  m(
    "关于作者",
    [
      r("作品集", g),
      r("自我介绍", l)
    ]
  )
], e = t("text"), x = [
  [e("⚠️ 404_Response_From_Server", 1e3)],
  [e("服务器繁忙，请稍后再试", 3e3)],
  [e("正在从火星数据中心同步...", 1500)],
  [e("⚠️ 程序员正在和bug搏斗中", 2e3)],
  [e("服务器正在思考人生...请等待42毫秒", 1e3)],
  [e("您的请求已被加入区块链，等待矿工确认⛏️", 2500)],
  [e("To be replied, or not to be replied...", 1800)],
  [e("正在为您翻山越岭⛰️...但服务器有点恐高", 2200)],
  [e("从前有台服务器...它响应得有点慢", 1500)],
  [e("等待是美好的，因为它预示着回复即将到来", 3e3)],
  [e("⌛ 加载中... 99% (别信这个进度条)", 2e3)],
  [e("您获得了【耐心等待】成就 +10XP", 2500)],
  [e("服务器正在团战中，请稍候...", 1800)],
  [e("需要更多矿(资)石(源)来建造回复", 1500)],
  [e("服务器正在喝咖啡提神☕...", 1200)],
  [e("您的留言正在排队，前面还有3只树懒", 3e3)],
  [e("我们的信鸽正在路上🕊️...", 2e3)],
  [e("服务器说它需要5分钟冥想时间", 1500)],
  [e("正在通过量子隧道传输数据...", 2500)],
  [e("来自未来的回复正在时间旅行中⏳", 1800)],
  [e("警告：检测到时空扭曲，响应延迟", 1500)]
], y = {
  me: "https://ss2.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3315366793,2321372572&fm=253&gp=0.jpg",
  user: "https://pic1.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_xs.jpg"
}, k = [
  `%c👻 发现秘密！
%c要看看该项目的屎山代码吗，欢迎PR → %chttps://github.com/fcbyk/fcbyk`,
  "font-size:16px",
  "color:#666",
  "color:#1890ff; text-decoration:underline"
], _ = {
  about: l,
  works: g,
  domain: f
}, w = t("text"), P = t("file"), v = {
  网易云: [w("音乐组件存在bug，等待修复中", 1e3)],
  键盘测试: [P({
    fileName: "KB2_105.exe",
    fileSize: "645 KB",
    fileType: "exe",
    fileUrl: "https://github.com/fcbyk/fcbyk/releases/download/files/KB2_105.exe"
  })]
}, M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actionMenu: d,
  autoReply: x,
  avatar: y,
  cliPrint: k,
  keywordReply: v,
  urlReply: _
}, Symbol.toStringTag, { value: "Module" })), S = {
  ...M
};
export {
  S as default
};
