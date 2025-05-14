const u = (o, c, a = 0) => {
  if (!c) throw new Error("消息不能为空");
  return { type: o, content: c, loadingTime: a };
}, e = (o) => (c, a) => u(o, c, a), m = e("text"), n = (o, c = {
  question: m(o),
  answer: [m("服务器繁忙，请稍后再试", 3e3)]
}) => ({ label: o, action: c }), i = e("text"), p = e("image"), b = {
  question: i("fcbyk.com这个域名是怎么来的？"),
  answer: [
    i("fcbyk是非常不愉快的拼音首字母", 800),
    i("源于昵称重复，很久之前，我在某APP，取名字", 1e3),
    p("https://user-images.githubusercontent.com/101487905/211132451-e4f08849-4ee0-411f-8882-7c84a3862146.gif", 2e3),
    i("尝试了很多昵称，一直提示重复，最终只有非常不愉快这个昵称通过了系统的唯一性验证", 1500),
    p("https://user-images.githubusercontent.com/101487905/211133219-7f840601-6a2f-4aab-a3d0-e8ab7b189f99.png", 2e3),
    i("之后遇到的其他不能重名的APP或游戏，都是优先使用非常不愉快这个昵称。", 1200),
    p("https://user-images.githubusercontent.com/101487905/211133769-74cc86ce-190b-48d7-80ee-4b7b80825734.png", 2e3),
    i("有的时候非常不愉快也会重名，之后慢慢衍生出不愉快，不愉，不是不余这些昵称", 1200),
    i("不知不觉，非常不愉快这个昵称陪伴了我好久，之后也不太想改", 800),
    i("不愉快，在这里，没有emo和负能量的意思", 800)
  ]
}, s = e("text"), f = {
  question: s("可以介绍一下你自己吗"),
  answer: [
    s("还没想好怎么介绍自己", 1500),
    s("挺遗憾的，毕业后，没从事计科相关的工作", 1500),
    s("2025年，正在努力通过计科变现", 1500),
    s("目前是一名少儿编程老师，教Scratch、C++", 1500)
  ]
}, r = e("text"), w = e("html"), h = {
  question: r("你写过哪些项目"),
  answer: [
    r("可以在GitHub访问我写过的项目噢", 1500),
    w(`<a href="https://github.com/fcbyk" class="custom-link" target="_blank">
                github.com/fcbyk
                </a>`, 1e3)
  ]
}, d = (o, c) => ({ label: o, child: c }), g = [
  n("近期规划"),
  n("域名由来", b),
  d(
    "关于作者",
    [
      n("作品集", h),
      n("自我介绍", f)
    ]
  )
], t = e("text"), k = [
  [t("⚠️ 404_Response_From_Server", 1e3)],
  [t("服务器繁忙，请稍后再试", 3e3)],
  [t("正在从火星数据中心同步...", 1500)],
  [t("⚠️ 程序员正在和bug搏斗中", 2e3)],
  [t("服务器正在思考人生...请等待42毫秒", 1e3)],
  [t("您的请求已被加入区块链，等待矿工确认⛏️", 2500)],
  [t("To be replied, or not to be replied...", 1800)],
  [t("正在为您翻山越岭⛰️...但服务器有点恐高", 2200)],
  [t("从前有台服务器...它响应得有点慢", 1500)],
  [t("等待是美好的，因为它预示着回复即将到来", 3e3)],
  [t("⌛ 加载中... 99% (别信这个进度条)", 2e3)],
  [t("您获得了【耐心等待】成就 +10XP", 2500)],
  [t("服务器正在团战中，请稍候...", 1800)],
  [t("需要更多矿(资)石(源)来建造回复", 1500)],
  [t("服务器正在喝咖啡提神☕...", 1200)],
  [t("您的留言正在排队，前面还有3只树懒", 3e3)],
  [t("我们的信鸽正在路上🕊️...", 2e3)],
  [t("服务器说它需要5分钟冥想时间", 1500)],
  [t("正在通过量子隧道传输数据...", 2500)],
  [t("来自未来的回复正在时间旅行中⏳", 1800)],
  [t("警告：检测到时空扭曲，响应延迟", 1500)]
], y = {
  me: "https://ss2.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3315366793,2321372572&fm=253&gp=0.jpg",
  user: "https://pic1.zhimg.com/v2-abed1a8c04700ba7d72b45195223e0ff_xs.jpg"
}, v = [
  `%c👻 发现秘密！
%c要看看该项目的屎山代码吗，欢迎PR → %chttps://github.com/fcbyk/fcbyk`,
  "font-size:16px",
  "color:#666",
  "color:#1890ff; text-decoration:underline"
], x = {
  about: f,
  works: h,
  domain: b
}, _ = [
  {
    icon: "https://www.deepseek.com/favicon.ico",
    title: "DeepSeek",
    link: "https://www.deepseek.com/",
    desc: "深度求索大模型"
  },
  {
    icon: "https://chat.openai.com/favicon.ico",
    title: "ChatGPT 官方",
    link: "https://chat.openai.com/chat",
    desc: "OpenAI 官方大模型"
  },
  {
    icon: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/web/logo-icon.png",
    title: "豆包",
    desc: "字节跳动-云雀语言模型",
    link: "https://www.doubao.com/"
  }
], P = [
  {
    title: "Steam",
    link: "https://store.steampowered.com/"
  },
  {
    title: "Epic Games",
    link: "https://store.epicgames.com/"
  },
  {
    title: "steam离线游戏",
    link: "https://pp.520ee.vip/"
  }
], q = [
  {
    icon: "https://www.bilibili.com/favicon.ico?v=1",
    title: "哔哩哔哩",
    link: "https://www.bilibili.com/"
  },
  {
    icon: "https://v.qq.com/favicon.ico",
    title: "腾讯视频",
    link: "https://v.qq.com/"
  },
  {
    icon: "https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/public/favicon.ico",
    title: "抖音",
    link: "https://www.douyin.com/"
  },
  {
    icon: "https://vip.diaoyu18.com/favicon.ico",
    title: "视频解析",
    link: "https://vip.diaoyu18.com/"
  },
  {
    icon: "https://www.iyf.tv/assets/images/player_logo.png",
    title: "爱壹帆",
    link: "https://www.iyf.tv/"
  }
], S = e("text"), B = e("file"), l = e("nav"), M = {
  网易云: [S("音乐组件存在bug，等待修复中", 1e3)],
  "键盘测试@下载": [B({
    fileName: "KB2_105.exe",
    fileSize: "645 KB",
    fileType: "exe",
    fileUrl: "https://github.com/fcbyk/fcbyk/releases/download/files/KB2_105.exe"
  })],
  "ai@书签": _.map(l, 0),
  "游戏@书签": P.map(l, 0),
  "视频@书签": q.map(l, 0)
}, j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actionMenu: g,
  autoReply: k,
  avatar: y,
  cliPrint: v,
  keywordReply: M,
  urlReply: x
}, Symbol.toStringTag, { value: "Module" })), R = {
  ...j
};
export {
  R as default
};
