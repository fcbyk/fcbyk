declare interface MessageConfig {

    // 消息类型
    type: "text" | "image" | "audio" | "video";

    // 消息内容
    content: string;

    // 消息加载时间
    loadingTime: number;
}

declare interface Message extends MessageConfig {

    // 时间戳
    time: number;

    // 消息发送者
    role: "me" | "user";

    // 消息状态
    status: 'loading' | 'completed' | 'error';
}

declare type MessageList = Message[];

declare interface QA {
    question: MessageConfig;
    answer: MessageConfig[];
}

type ActionMenuItemBase = {
    label: string;
    action: QA;
};

type ActionMenuItemWithChildren = {
    label: string;
    child: {
        label: string;
        action: QA;
    }[];
    action?: never;
};

type ActionMenuItem = ActionMenuItemBase | ActionMenuItemWithChildren;

declare type actionMenu = actionMenuItem[]

declare interface chatConfig {

    name: string,

    avatar: {
        me: string,
        user: string
    },

    timeThreshold: number,

    actionMenu: actionMenu,
}