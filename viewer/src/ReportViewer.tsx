import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface TocEntry {
  id: string
  text: string
  level: number
}

interface ReportViewerProps {
  markdown: string
  onBack: () => void
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export default function ReportViewer({ markdown, onBack }: ReportViewerProps) {
  const [showHelpers, setShowHelpers] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const contentRef = useRef<HTMLDivElement>(null)

  // Strip the JS script blocks and the "show help text" link from the markdown
  const cleanMarkdown = useMemo(() => {
    return markdown
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<a[^>]*id="show-help-text"[^>]*>.*?<\/a>/gi, '')
      .replace(/<div id="toc-placeholder"><\/div>/gi, '')
  }, [markdown])

  // Extract TOC from headings in the markdown
  const toc = useMemo<TocEntry[]>(() => {
    const entries: TocEntry[] = []
    const seen = new Map<string, number>()
    const headingRegex = /^(#{1,4})\s+(.+)$/gm
    let match
    while ((match = headingRegex.exec(cleanMarkdown)) !== null) {
      const text = match[2].replace(/[*_`]/g, '').trim()
      if (!text) continue
      const base = slugify(text)
      const count = seen.get(base) || 0
      seen.set(base, count + 1)
      const id = count > 0 ? `${base}-${count}` : base
      entries.push({ id, text, level: match[1].length })
    }
    return entries
  }, [cleanMarkdown])

  // Track headings seen during render for unique IDs
  const headingCounters = useRef<Map<string, number>>(new Map())

  // Reset counters before each render
  useEffect(() => {
    headingCounters.current = new Map()
  }, [cleanMarkdown])

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Intersection observer for active TOC item
  useEffect(() => {
    if (!contentRef.current) return
    const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4')
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [cleanMarkdown])

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setSidebarOpen(false)
    }
  }, [])

  // Custom heading component that adds IDs matching the TOC
  const headingRenderer = useCallback(
    (level: number) => {
      const Tag = `h${level}` as keyof JSX.IntrinsicElements
      return function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
        const text = extractText(children)
        const base = slugify(text)
        const counters = headingCounters.current
        const count = counters.get(base) || 0
        counters.set(base, count + 1)
        const id = count > 0 ? `${base}-${count}` : base
        return (
          <Tag id={id} {...props}>
            {children}
          </Tag>
        )
      }
    },
    []
  )

  // Reset counters on each render cycle
  headingCounters.current = new Map()

  return (
    <div className={`app-layout ${showHelpers ? 'helpers-visible' : ''}`}>
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '\u2715' : '\u2630'}
      </button>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">Table of Contents</div>
        <div className="sidebar-controls">
          <button onClick={onBack}>
            Back
          </button>
          <button
            className={showHelpers ? 'active' : ''}
            onClick={() => setShowHelpers(!showHelpers)}
          >
            {showHelpers ? 'Hide' : 'Help'}
          </button>
          <button
            className={darkMode ? 'active' : ''}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <button onClick={() => window.print()}>
            Print
          </button>
        </div>
        <nav className="toc-nav">
          <ul>
            {toc.map((entry) => (
              <li key={entry.id} className={`toc-h${entry.level}`}>
                <a
                  href={`#${entry.id}`}
                  className={activeId === entry.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(entry.id)
                  }}
                >
                  {entry.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="report-container">
          <div className="report-content" ref={contentRef}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: headingRenderer(1),
                h2: headingRenderer(2),
                h3: headingRenderer(3),
                h4: headingRenderer(4),
              }}
            >
              {cleanMarkdown}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  )
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as React.ReactElement).props.children)
  }
  return ''
}
