import { QA } from "@/types";
import { createTextMsg } from "../utils"
import { onMounted, onUnmounted } from 'vue'

export const defineQA = (qa: QA): QA => qa;

export const sleep = (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms))

export const createMenuItem = (label: string, action: QA = {
    question: createTextMsg(label),
    answer: [createTextMsg("服务器繁忙，请稍后再试", 3000)]
}) => ({ label, action, })

export function useClickOutside(callback: () => void) {
    onMounted(() => document.addEventListener('click', callback))
    onUnmounted(() => document.removeEventListener('click', callback))
}