import type { ActionMenu, QA, MessageConfig } from '@/types';

export interface ChatConfig {
  /**
   * 昵称设置(站点标题)
   */
  name: string;

  /**
   * 背景配置
   */
  background: { 
    type: number, 
    props?: Object
  };

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