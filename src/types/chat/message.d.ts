// 基础消息配置
export type MessageType = 'text' | 'image' | 'audio' | 'video' | 'html';
export type MessageRole = 'me' | 'user';
export type MessageStatus = 'loading' | 'completed' | 'error';

export interface MessageConfig {
    type: MessageType;
    content: string;
    loadingTime: number;
}

// 完整消息结构
export interface Message extends MessageConfig {
    time: number;
    role: MessageRole;
    status: MessageStatus;
}

// 消息列表
export type MessageList = Message[];