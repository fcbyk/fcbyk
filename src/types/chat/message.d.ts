// 基础消息配置
interface MessageConfig {
    type: "text" | "image" | "audio" | "video";
    content: string;
    loadingTime: number;
}

// 完整消息结构
interface Message extends MessageConfig {
    time: number;
    role: "me" | "user";
    status: 'loading' | 'completed' | 'error';
}

// 消息列表
type MessageList = Message[];