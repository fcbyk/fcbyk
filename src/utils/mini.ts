import { QA } from "@/types";
import { createTextMsg } from "../utils"

export const defineQA = (qa: QA): QA => qa;

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createMenuItem = (label: string, action: QA = {
    question: createTextMsg(label),
    answer: [createTextMsg("服务器繁忙，请稍后再试", 3000)]
}) => ({ label, action, })

