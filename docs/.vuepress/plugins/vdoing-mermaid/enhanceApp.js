import mermaid from 'mermaid'

export default ({ router, isServer }) => {
  if (isServer) return

  // 初始化 mermaid 配置
  // securityLevel: 'loose' 支持 <br/> 等 HTML 标签（你的图中大量使用）
  // theme: 'default' 使用默认主题，与 vdoing 风格一致
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',        // 支持图中的 HTML 标签如 <br/>
    fontFamily: 'inherit',
    sequence: {
      diagramMarginX: 20,
      diagramMarginY: 10,
      actorMargin: 40,
      width: 150,
      height: 65,
      boxMargin: 10,
      noteMaxWidth: 200,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: true,
    },
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,           // 支持 HTML 标签在节点中
      curve: 'basis',
      padding: 15,
      nodeSpacing: 50,
      rankSpacing: 50,
    },
    gantt: { fontSize: 11 },
    class: { fontSize: 12 },
    state: { fontSize: 12 },
  })

  /**
   * 渲染页面中所有未处理的 .mermaid 元素
   */
  const renderMermaid = () => {
    // 只选择未被渲染的 .mermaid 元素（避免重复处理）
    const els = document.querySelectorAll('.mermaid:not([data-processed])')
    if (els.length === 0) return

    els.forEach((el) => {
      // 标记为已处理，防止重复
      el.setAttribute('data-processed', 'true')

      try {
        const code = el.textContent.trim()
        if (!code) return

        // 用唯一 id 渲染，避免冲突
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        
        mermaid.render(id, code).then(({ svg }) => {
          el.innerHTML = svg
          el.classList.add('mermaid-rendered')
          el.removeAttribute('data-processed') // 移除标记，允许重新渲染（如果需要）
        }).catch((err) => {
          console.error('[mermaid] render error:', err)
          // 显示友好错误提示而非空白
          el.innerHTML =
            '<div style="color:#c00;padding:1rem;border:1px solid #f5c6cb;border-radius:4px;background:#fff5f5;font-size:14px;">' +
            '<p style="margin:0 0 8px;"><strong>⚠ Mermaid 图表语法错误</strong></p>' +
            `<pre style="margin:0;background:#f8f8f8;padding:8px;overflow:auto;font-size:12px;max-height:200px;color:#555;">${escapeHtml(err.message || String(err))}</pre>` +
            '</div>'
        })
      } catch (err) {
        console.error('[mermaid] unexpected error:', err)
      }
    })
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }

  // 首次加载后渲染（延迟确保 DOM 就绪）
  window.addEventListener('load', () => setTimeout(renderMermaid, 300))

  // VuePress SPA 路由切换后重新渲染新页面的 mermaid 图
  if (router && router.afterEach) {
    router.afterEach(() => setTimeout(renderMermaid, 400))
  }

  // 监听 DOM 变化（应对动态加载内容）
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => renderMermaid())
    observer.observe(document.body, { childList: true, subtree: true })
  }
}
