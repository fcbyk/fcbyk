import type { MessageConfig } from './message';

// 问答对结构
export interface QA {
  question: MessageConfig;
  answer: MessageConfig[];
}