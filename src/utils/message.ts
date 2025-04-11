import { sleep } from "./mini";
import { Ref } from "vue";
import { MessageConfig, MessageRole, MessageType, Message } from "@/types";

interface MessageSender {
    send(
        role: MessageRole,
        content: string,
        loadingTime?: number,
        type?: MessageType
    ): Promise<void>;
    sendAsUser(content: string, type?: MessageType): Promise<void>;
    sendAsMe(content: string, loadingTime?: number, type?: MessageType): Promise<void>;
}

export function createMessageSender(messageList: Ref<Message[]>): MessageSender {

    const send = async (
        role: MessageRole,
        content: string,
        loadingTime: number = 0,
        type: MessageType = 'text'
    ): Promise<void> => {
        const msg: Message = {
            role,
            type,
            content,
            time: Date.now(),
            status: 'loading',
            loadingTime
        };

        const msgIndex = messageList.value.length;
        messageList.value.push(msg);

        if (loadingTime > 0) await sleep(loadingTime);

        if (messageList.value[msgIndex]?.time === msg.time) {
            messageList.value[msgIndex].status = 'completed';
        }
    };

    return {
        send,
        sendAsUser: (content, type = 'text') => send('user', content, 0, type),
        sendAsMe: (content, loadingTime = 100, type = 'text') => send('me', content, loadingTime, type)
    };
};

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
export const createMessageCreator = (messageType: MessageType) =>
    (content: string, loadingTime?: number) => createMediaMessage(messageType, content, loadingTime);