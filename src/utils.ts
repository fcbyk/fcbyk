import { MessageConfig, MessageType, FileContent, QA } from "@/types";

// 工厂函数
const createMediaMessage = (
    type: MessageType,
    content: string | FileContent,
    loadingTime: number = 0
): MessageConfig => {
    if (!content) throw new Error("消息不能为空");
    return { type, content, loadingTime };
};

// 创建指定类型的消息生成函数
export const createMessageCreator = (messageType: MessageType) =>
    (content: string | FileContent, loadingTime?: number) => createMediaMessage(messageType, content, loadingTime);

export const defineQA = (qa: QA): QA => qa;

const text = createMessageCreator("text")

export const createMenuItem = (label: string, action: QA = {
    question: text(label),
    answer: [text("服务器繁忙，请稍后再试", 3000)]
}) => ({ label, action, })