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

// 问答对结构
export interface QA {
  question: MessageConfig;
  answer: MessageConfig[];
}

export interface ChatConfig {
  /**
   * 昵称设置(站点标题)
   */
  name: string;

  /**
   * 问候语设置
   */
  hello: MessageConfig[];

  /**
   * 自动回复设置
   */
  autoReply: MessageConfig[][];

  /**
   * 关键词回复
   */
  keywordReply: {
    [key: string]: MessageConfig[];
  };

  /**
   * url回复
   */
  urlReply: {
    [key: string]: QA
  };

  /**
   * 头像设置
   * me: 你的头像
   * user: 提问者的头像
   */
  avatar: {
    me: string;
    user: string;
  };

  /**
   * 时间间隔阈值（毫秒）
   */
  timeThreshold: number;

  /**
   * 菜单设置
   */
  actionMenu: ActionMenu;

  /**
   * 控制台打印
   */
  cliPrint: any[];

  /**
   * 允许任意额外的字符串属性
   */
  [key: string]: any;
}

export type ChatConfigOptions = Partial<ChatConfig>;

// 基础菜单项
export type ActionMenuItemBase = {
  label: string;
  action: QA;
};

// 带子菜单的项
export type ActionMenuItemWithChildren = {
  label: string;
  child: {
    label: string;
    action: QA;
  }[];
  action?: never;
};

// 联合类型
export type ActionMenuItem = ActionMenuItemBase | ActionMenuItemWithChildren;

// 菜单列表
export type ActionMenu = ActionMenuItem[];