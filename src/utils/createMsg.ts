import { MessageConfig } from "@/types";

// 常量定义
const MESSAGE_TYPES = {
    TEXT: "text",
    IMAGE: "image",
    AUDIO: "audio",
    VIDEO: "video",
} as const;

type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];

// 工厂函数
const createMediaMessage = (
    type: MessageType,
    content: string,
    loadingTime: number = 0
): MessageConfig => {
    if (!content) throw new Error("消息不能为空");
    return { type, content, loadingTime };
};

// 创建指定类型的消息生成函数
const createMessageCreator = (messageType: MessageType) =>
    (content: string, loadingTime?: number) => createMediaMessage(messageType, content, loadingTime);

// 具体函数导出
export const createTextMsg = createMessageCreator(MESSAGE_TYPES.TEXT);
export const createImageMsg = createMessageCreator(MESSAGE_TYPES.IMAGE);
export const createAudioMsg = createMessageCreator(MESSAGE_TYPES.AUDIO);
export const createVideoMsg = createMessageCreator(MESSAGE_TYPES.VIDEO);