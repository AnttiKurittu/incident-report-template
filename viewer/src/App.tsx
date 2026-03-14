import { useState, useCallback } from 'react'
import ReportViewer from './ReportViewer'
import exampleReport from './exampleReport.md?raw'

function App() {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = useCallback((files: FileList) => {
    // Sort files alphabetically by name (to match the Report/*.md ordering)
    const sorted = Array.from(files).sort((a, b) => a.name.localeCompare(b.name))
    const readers = sorted.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.readAsText(file)
        })
    )
    Promise.all(readers).then((contents) => {
      setMarkdown(contents.join('\n\n'))
    })
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      if (e.dataTransfer.files.length) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles]
  )

  const handleFileInput = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = '.md,.markdown,.txt'
    input.onchange = () => {
      if (input.files?.length) handleFiles(input.files)
    }
    input.click()
  }, [handleFiles])

  if (markdown) {
    return <ReportViewer markdown={markdown} onBack={() => setMarkdown(null)} />
  }

  return (
    <div
      className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <h2>Incident Report Viewer</h2>
      <p>Drop your report markdown files here</p>
      <p style={{ fontSize: '0.8rem' }}>
        Select all Report/*.md files — they will be sorted alphabetically
      </p>
      <div className="or-divider">— or —</div>
      <button onClick={handleFileInput}>Browse files</button>
      <button className="load-example-btn" onClick={() => setMarkdown(exampleReport)}>
        Load example report
      </button>
    </div>
  )
}

export default App
