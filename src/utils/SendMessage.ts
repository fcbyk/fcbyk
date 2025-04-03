import { sleep } from "@/utils";
import { Ref } from "vue";
import { Message } from "@/types";

export class SendMessage {

    private MessageList: Ref<Message[]>;

    constructor(messageList: Ref<Message[]>) {
        this.MessageList = messageList;
    }

    private async SendMessage(
        role: 'me' | 'user',
        content: string,
        loadingTime: number = 0,
        type: 'text' | 'image' | 'audio' | 'video' = 'text'
    ) {
        const msg: Message = {
            role,
            type,
            content,
            time: Date.now(),
            status: 'loading',
            loadingTime
        };
        this.MessageList.value.push(msg);
        await sleep(loadingTime);
        this.MessageList.value[this.MessageList.value.length - 1].status = 'completed';
    }

    public async userSendMessage(
        content: string,
        type: 'text' | 'image' | 'audio' | 'video' = 'text'
    ){
        await this.SendMessage("user",content, 0, type);
    }

    public async meSendMessage(
        content: string,
        loadingTime: number = 100,
        type: 'text' | 'image' | 'audio' | 'video' = 'text'
    ){
        await this.SendMessage("me",content, loadingTime, type);
    }
}