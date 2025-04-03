// 基础消息配置
export interface MessageConfig {
    type: "text" | "image" | "audio" | "video";
    content: string;
    loadingTime: number;
}

// 完整消息结构
export interface Message extends MessageConfig {
    time: number;
    role: "me" | "user";
    status: 'loading' | 'completed' | 'error';
}

// 消息列表
export type MessageList = Message[];