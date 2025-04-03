import type { MessageConfig } from './message';

// 问答对结构
interface QA {
  question: MessageConfig;
  answer: MessageConfig[];
}