describe('聊天应用测试', () => {
  beforeEach(() => {
    // 访问应用首页
    cy.visit('/')
  })

  it('应该正确加载应用', () => {
    // 检查标题栏是否存在
    cy.get('.title-bar').should('exist')
    
    // 检查聊天窗口是否存在
    cy.get('.chat-window').should('exist')
    
    // 检查底部栏是否存在
    cy.get('.bottom-bar').should('exist')
  })

  it('应该显示正确的初始状态', () => {
    // 检查窗口控制按钮
    cy.get('.window-controls').should('be.visible')
    cy.get('.control-dot').should('have.length', 3)
  })

  it('应该在移动端正确显示', () => {
    // 设置移动端视口
    cy.viewport(375, 667)
    
    // 检查移动端标题是否显示
    cy.get('.mobile-title').should('be.visible')
    
    // 检查窗口控制按钮是否隐藏
    cy.get('.window-controls').should('not.be.visible')
  })

  it('应该测量应用组件的渲染时间', () => {
    // 使用 Cypress 的性能 API 测量渲染时间
    cy.window().then((win) => {
      const startTime = performance.now()
      
      // 等待应用完全加载
      cy.get('.chat-window').should('be.visible').then(() => {
        const endTime = performance.now()
        const renderTime = endTime - startTime
        
        // 输出渲染时间
        cy.log(`应用渲染时间: ${renderTime.toFixed(2)}ms`)
        
        // 断言渲染时间在合理范围内（例如小于 1000ms）
        expect(renderTime).to.be.lessThan(1000)
      })
    })
  })
}) 