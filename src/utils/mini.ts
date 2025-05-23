import { QA } from "@/types";
import { onMounted, onUnmounted } from 'vue'

const createTextMessage = (content: string, loadingTime: number = 0) => ({
  type: 'text' as const,
  content,
  loadingTime
});

export const defineQA = (qa: QA): QA => qa;

export const sleep = (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms))

export const createMenuItem = (label: string, action: QA = {
    question: createTextMessage(label),
    answer: [createTextMessage("服务器繁忙，请稍后再试", 3000)]
}) => ({ label, action, })

export function useClickOutside(callback: () => void) {
    onMounted(() => document.addEventListener('click', callback))
    onUnmounted(() => document.removeEventListener('click', callback))
}

export function getRandomElement(arr: any[]) {
    if (!Array.isArray(arr) || arr.length === 0)
        throw new Error("Input must be a non-empty array");
    return arr[Math.floor(Math.random() * arr.length)];
}