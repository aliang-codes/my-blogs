import mermaid from 'mermaid'

export default ({ router, isServer }) => {
  if (isServer) return

  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose', // 支持图中 <br/> 等 HTML 标签
    themeVariables: {
      fontFamily: 'inherit'
    }
  })

  const renderMermaid = () => {
    const els = document.querySelectorAll('.mermaid:not([data-processed])')
    if (els.length > 0) {
      try {
        mermaid.init(undefined, els)
      } catch (e) {
        console.error('[mermaid] render error:', e)
      }
    }
  }

  // 首次加载
  window.addEventListener('load', () => setTimeout(renderMermaid, 200))

  // SPA 路由切换后重新渲染
  if (router && router.afterEach) {
    router.afterEach(() => setTimeout(renderMermaid, 300))
  }
}
