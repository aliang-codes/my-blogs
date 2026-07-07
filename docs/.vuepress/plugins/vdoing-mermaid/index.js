const path = require('path')

/**
 * vdoing-mermaid 本地插件
 *
 * 兼容 VuePress 1.x 的 Mermaid 渲染插件。
 * 原理：把 markdown 中 ```mermaid 代码块输出为 <div class="mermaid">源码</div>，
 * 再由 enhanceApp.js 在客户端加载 mermaid 库并渲染为 SVG。
 *
 * 优势：
 * - 不依赖 $dataBlock 等不稳定机制，dev 和生产环境均可正常工作
 * - 支持错误友好提示
 * - 支持路由切换后重渲染
 */
module.exports = (options = {}, ctx) => ({
  name: 'vdoing-mermaid',
  extendMarkdown(md) {
    // 覆盖默认的 fence 渲染规则
    const defaultFence = md.renderer.rules.fence
    md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
      const token = tokens[idx]
      const info = (token.info || '').trim().split(/\s+/)[0]

      if (info === 'mermaid') {
        // 输出为标准 mermaid div 结构，客户端会自动渲染
        return `<div class="mermaid">\n${token.content}\n</div>\n`
      }

      // 非 mermaid 代码块走默认逻辑
      return defaultFence(tokens, idx, opts, env, self)
    }
  },
  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js'),
})
