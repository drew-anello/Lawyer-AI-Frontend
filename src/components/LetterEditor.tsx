import React, { useRef, useEffect, useState } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph, TextRun } from 'docx'

interface Metadata {
  client: string
  opposing_party: string
  deadline_date: string
  generated_at: string
}

interface LetterEditorProps {
  letter: string
  metadata: Metadata
  onBack: () => void
  onReset: () => void
}

const primaryButtonClasses = 'bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition disabled:opacity-60 disabled:cursor-not-allowed'
const secondaryButtonClasses = 'bg-gray-700 text-gray-200 px-8 py-3 rounded-md font-semibold hover:bg-gray-600'

const LetterEditor: React.FC<LetterEditorProps> = ({ letter, metadata, onBack, onReset }) => {
  const [fontFamily, setFontFamily] = useState<string>('serif')
  const editableRef = useRef<HTMLDivElement>(null)
  const letterTextRef = useRef<string>(letter)

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.innerText = letter
    }
  }, [letter])

  const handleCopy = () => {
    if (editableRef.current) {
      navigator.clipboard.writeText(editableRef.current.innerText)
      alert('Demand letter copied to clipboard!')
    }
  }

  const handleExportPDF = async () => {
    if (!editableRef.current) return
    const text = editableRef.current.innerText

    const pdf = new jsPDF('p', 'pt', 'a4')
    const margin = 40
    const pageHeight = pdf.internal.pageSize.getHeight()
    const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2
    const lineHeight = 14
    pdf.setFontSize(12)

    const lines = pdf.splitTextToSize(text, maxWidth)
    let cursorY = margin
    lines.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - margin) {
        pdf.addPage()
        cursorY = margin
      }
      pdf.text(line, margin, cursorY)
      cursorY += lineHeight
    })
    pdf.save('demand-letter.pdf')
  }

  const handleExportDocx = async () => {
    const text = editableRef.current?.innerText || ''
    const paragraphs = text.split('\n').map(line => new Paragraph({ children: [new TextRun(line)] }))
    const doc = new Document({ sections: [{ children: paragraphs }] })
    const blob = await Packer.toBlob(doc)
    saveAs(blob, 'demand-letter.docx')
  }

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-800 p-8 border-b border-gray-700">
        <h3 className="text-purple-500 text-2xl mb-6">Generated Demand Letter</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
            <strong>Client:</strong> {metadata.client}
          </div>
          <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
            <strong>Opposing Party:</strong> {metadata.opposing_party}
          </div>
          <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
            <strong>Deadline:</strong> {metadata.deadline_date}
          </div>
          <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
            <strong>Generated:</strong> {new Date(metadata.generated_at).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-8 max-h-[600px] overflow-y-auto">
        <div className="mb-4 flex items-center gap-3">
          <label htmlFor="font-select" className="text-sm text-gray-300">Font:</label>
          <select
            id="font-select"
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
            className="bg-gray-800 text-gray-200 border border-gray-600 rounded p-2 text-sm"
          >
            <option value="serif">Serif (Times)</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="sans-serif">Sans-serif (Arial)</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>

        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={e => {
            letterTextRef.current = (e.target as HTMLElement).innerText
          }}
          className="w-full min-h-[400px] whitespace-pre-wrap break-words text-base leading-relaxed text-white focus:outline-none bg-transparent"
          style={{ whiteSpace: 'pre-wrap', fontFamily }}
        />
      </div>

      <div className="p-8 bg-gray-800 border-t border-gray-700 flex flex-wrap gap-4">
        <button className={primaryButtonClasses} onClick={handleCopy}>
          Copy to Clipboard
        </button>
        <button className={primaryButtonClasses} onClick={handleExportPDF}>
          Export PDF
        </button>
        <button className={primaryButtonClasses} onClick={handleExportDocx}>
          Export DOCX
        </button>
        <button className={secondaryButtonClasses} onClick={onBack}>
          ← Back to Form
        </button>
        <button className={secondaryButtonClasses} onClick={onReset}>
          Create New Letter
        </button>
      </div>
    </div>
  )
}

export default LetterEditor 