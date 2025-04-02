export const text = (content: string, loadingTime: number = 0): MessageConfig => ({
    type: "text",
    content,
    loadingTime,
})