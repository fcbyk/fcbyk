type MessageList = {
    id: string;

    // 消息发送者
    role: "me" | "user";

    // 消息类型
    type: "text" | "image" | "audio" | "video";

    // 消息内容
    content: string;

    // 时间戳
    time: number;

    // 消息状态
    status: 'loading' | 'completed' | 'error';

    // 消息加载时间
    loadingTime: number;
}[];