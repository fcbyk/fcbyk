import { MessageConfig, MessageType } from "@/types";

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
export const createTextMsg = createMessageCreator("text");
export const createImageMsg = createMessageCreator("image");
export const createAudioMsg = createMessageCreator("audio");
export const createVideoMsg = createMessageCreator("video");