import type { ActionMenu } from '../ui/action-menu';

export interface ChatConfig {

  /**
   * 昵称设置
   * 默认值：非常不愉快
   */
  name?: string;

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
   * 默认值：5分钟 (1000 * 60 * 5)
   */
  timeThreshold?: number;

  /**
   * 菜单设置
   */
  actionMenu: ActionMenu;

  /**
   * 控制台打印
   */
  cliPrint?: any[];

  /**
   * 允许任意额外的字符串属性
   */
  [key: string]: any;
}