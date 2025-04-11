/// <reference types="cypress" />

// 导入命令
import './commands'

// 或者使用 CommonJS 语法:
// require('./commands')

// 可以在这里添加全局设置
beforeEach(() => {
  // 在每个测试之前运行的代码
  cy.viewport(1280, 720) // 设置默认视口大小
}) 