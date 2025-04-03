import { QA } from "@/types";

export const defineQA = (qa: QA): QA => qa;

export const sleep =  (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))