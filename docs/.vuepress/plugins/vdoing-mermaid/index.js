const path = require('path')

/**
 * 本地 Mermaid 插件（兼容 VuePress 1.x）
 * 思路：把 ```mermaid 代码块渲染为 <div class="mermaid">源码</div>，
 * 由 mermaid 在客户端自动渲染。
 */
module.exports = (options = {}, ctx) => ({
  name: 'vdoing-mermaid',
  extendMarkdown(md) {
    const defaultFence = md.renderer.rules.fence
    md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
      const token = tokens[idx]
      const info = (token.info || '').trim().split(/\s+/)[0]
      if (info === 'mermaid') {
        // 输出为 mermaid 标准结构，客户端会自动渲染
        return `<div class="mermaid">\n${token.content}</div>\n`
      }
      return defaultFence(tokens, idx, opts, env, self)
    }
  },
  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
})
