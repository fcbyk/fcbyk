// 在这里可以添加自定义命令
declare global {
  namespace Cypress {
    interface Chainable {
      // 可以在这里添加自定义命令的类型定义
    }
  }
}

// 防止 TypeScript 报错
export {} 