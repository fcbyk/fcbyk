import type { ActionMenu } from '../ui/action-menu';

// 聊天全局配置
interface ChatConfig {
  name: string;
  avatar: {
    me: string;
    user: string;
  };
  timeThreshold: number;
  actionMenu: ActionMenu;
}