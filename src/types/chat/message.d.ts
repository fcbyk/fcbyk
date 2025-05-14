// 基础消息配置
export type MessageType = 'text' | 'image' | 'audio' | 'video' | 'html' | 'music' | 'file' | 'nav';
export type MessageRole = 'me' | 'user';
export type MessageStatus = 'loading' | 'completed' | 'error';
export type MessageContent = string | FileContent | NavContent;

export interface MessageConfig {
    type: MessageType;
    content: MessageContent;
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

export interface FileContent {
    fileName: string
    fileSize: string
    fileType: string
    fileUrl: string
}

export interface NavContent {
    title: string
    link: string
    desc?: string
    icon?: string
}

