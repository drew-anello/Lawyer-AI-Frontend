import React, { useRef, useEffect } from 'react'

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
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          onInput={e => {
            letterTextRef.current = (e.target as HTMLElement).innerText
          }}
          className="w-full min-h-[400px] whitespace-pre-wrap break-words font-serif text-base leading-relaxed text-white focus:outline-none bg-transparent"
          style={{ whiteSpace: 'pre-wrap' }}
        />
      </div>

      <div className="p-8 bg-gray-800 border-t border-gray-700 flex flex-wrap gap-4">
        <button className={primaryButtonClasses} onClick={handleCopy}>
          Copy to Clipboard
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