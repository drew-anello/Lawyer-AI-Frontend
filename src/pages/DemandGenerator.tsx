import { useState, useRef, useEffect } from 'react'
import { useApiUrl  } from '../Hooks/api'

interface DemandLetterData {
  client_name: string
  opposing_party: string
  legal_matter: string
  date_of_incident: string
  nature_of_dispute: string
  damages_suffered: string
  desired_resolution: string
  deadline_days: number
}

interface ApiResponse {
  success: boolean
  demand_letter?: string
  metadata?: {
    client: string
    opposing_party: string
    deadline_date: string
    generated_at: string
  }
  error?: string
}

function DemandGeneratorPage() {
  const [formData, setFormData] = useState<DemandLetterData>({
    client_name: '',
    opposing_party: '',
    legal_matter: '',
    date_of_incident: '',
    nature_of_dispute: '',
    damages_suffered: '',
    desired_resolution: '',
    deadline_days: 14
  })

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [showLetter, setShowLetter] = useState(false)

  const editableRef = useRef<HTMLDivElement>(null)
  const letterTextRef = useRef<string>('')

  const inputClasses = 'w-full p-3 px-4 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900 focus:ring-4 focus:ring-purple-600/40'
  const labelClasses = 'block text-gray-200 font-semibold mb-2'
  const sectionHeadingClasses = 'text-purple-500 text-xl mb-6 pb-2 border-b-2 border-purple-600/60'
  const primaryButtonClasses = 'bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition disabled:opacity-60 disabled:cursor-not-allowed'
  const secondaryButtonClasses = 'bg-gray-700 text-gray-200 px-8 py-3 rounded-md font-semibold hover:bg-gray-600'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'deadline_days' ? parseInt(value) || 14 : value
    }))
  }
  const apiUrl = useApiUrl()
  
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setLoading(true)
      setResponse(null)
      
      try {
      const res = await fetch(`${apiUrl}/demand/generate-demand-letter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data: ApiResponse = await res.json()
      setResponse(data)
      if (data.success) {
        letterTextRef.current = data.demand_letter || ''
        setShowLetter(true)
      }
    } catch (error) {
      setResponse({
        success: false,
        error: 'Failed to connect to the server. Please ensure the backend is running on localhost:8000'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      client_name: '',
      opposing_party: '',
      legal_matter: '',
      date_of_incident: '',
      nature_of_dispute: '',
      damages_suffered: '',
      desired_resolution: '',
      deadline_days: 14
    })
    setResponse(null)
    setShowLetter(false)
    letterTextRef.current = ''
  }

  const handleCopyLetter = () => {
    if (editableRef.current) {
      navigator.clipboard.writeText(editableRef.current.innerText)
      alert('Demand letter copied to clipboard!')
    }
  }

  // Whenever a new letter is generated or reset, push text into the editable div once
  useEffect(() => {
    if (showLetter && editableRef.current) {
      editableRef.current.innerText = letterTextRef.current
    }
  }, [showLetter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1f004d] text-gray-200">
      <header className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-8 text-center shadow-lg">
        <h1 className="text-4xl font-bold">Demand Letter Generator</h1>
        <p className="mt-2 text-lg opacity-90">Generate professional demand letters for your legal practice</p>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        {!showLetter ? (
          <form onSubmit={handleSubmit} className="bg-neutral-900 rounded-xl shadow-lg p-8">
            <div className="mb-10">
              <h2 className={sectionHeadingClasses}>Client Information</h2>
              <div className="mb-6">
                <label htmlFor="client_name" className={labelClasses}>Client Name *</label>
                <input
                  type="text"
                  id="client_name"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe or ABC Corporation"
                  className={inputClasses}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="opposing_party" className={labelClasses}>Opposing Party *</label>
                <input
                  type="text"
                  id="opposing_party"
                  name="opposing_party"
                  value={formData.opposing_party}
                  onChange={handleInputChange}
                  required
                  placeholder="Jane Smith or XYZ Company"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mb-10">
              <h2 className={sectionHeadingClasses}>Case Details</h2>
              <div className="mb-6">
                <label htmlFor="legal_matter" className={labelClasses}>Legal Matter *</label>
                <input
                  type="text"
                  id="legal_matter"
                  name="legal_matter"
                  value={formData.legal_matter}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., breach of contract, personal injury, property damage"
                  className={inputClasses}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="date_of_incident" className={labelClasses}>Date of Incident *</label>
                <input
                  type="date"
                  id="date_of_incident"
                  name="date_of_incident"
                  value={formData.date_of_incident}
                  onChange={handleInputChange}
                  required
                  className={inputClasses}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="nature_of_dispute" className={labelClasses}>Nature of Dispute *</label>
                <textarea
                  id="nature_of_dispute"
                  name="nature_of_dispute"
                  value={formData.nature_of_dispute}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe the circumstances and facts of the dispute..."
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mb-10">
              <h2 className={sectionHeadingClasses}>Damages & Resolution</h2>
              <div className="mb-6">
                <label htmlFor="damages_suffered" className={labelClasses}>Damages Suffered *</label>
                <textarea
                  id="damages_suffered"
                  name="damages_suffered"
                  value={formData.damages_suffered}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="e.g., $50,000 in lost revenue, medical expenses, property damage..."
                  className={inputClasses}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="desired_resolution" className={labelClasses}>Desired Resolution *</label>
                <textarea
                  id="desired_resolution"
                  name="desired_resolution"
                  value={formData.desired_resolution}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="e.g., Payment of $50,000, cease and desist, specific performance..."
                  className={inputClasses}
                />
              </div>

              <div className="mb-6">
                <label htmlFor="deadline_days" className={labelClasses}>Deadline (days)</label>
                <input
                  type="number"
                  id="deadline_days"
                  name="deadline_days"
                  value={formData.deadline_days}
                  onChange={handleInputChange}
                  min="1"
                  max="90"
                  placeholder="14"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-800">
              <button type="submit" className={primaryButtonClasses} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Demand Letter'}
              </button>
              <button type="button" className={secondaryButtonClasses} onClick={handleReset}>
                Clear Form
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
            {response?.success && response.demand_letter && (
              <>
                <div className="bg-gray-800 p-8 border-b border-gray-700">
                  <h3 className="text-purple-500 text-2xl mb-6">Generated Demand Letter</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
                      <strong>Client:</strong> {response.metadata?.client}
                    </div>
                    <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
                      <strong>Opposing Party:</strong> {response.metadata?.opposing_party}
                    </div>
                    <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
                      <strong>Deadline:</strong> {response.metadata?.deadline_date}
                    </div>
                    <div className="p-3 bg-gray-900 rounded-md border border-gray-700">
                      <strong>Generated:</strong> {new Date(response.metadata?.generated_at || '').toLocaleString()}
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
                    style={{whiteSpace: 'pre-wrap'}}
                  />
                </div>

                <div className="p-8 bg-gray-800 border-t border-gray-700 flex flex-wrap gap-4">
                  <button className={primaryButtonClasses} onClick={handleCopyLetter}>
                    Copy to Clipboard
                  </button>
                  <button className={secondaryButtonClasses} onClick={() => setShowLetter(false)}>
                    ← Back to Form
                  </button>
                  <button className={secondaryButtonClasses} onClick={handleReset}>
                    Create New Letter
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {response?.error && (
          <div className="bg-rose-900 border border-rose-700 text-rose-300 p-6 rounded-md mt-8">
            <strong>Error:</strong> {response.error}
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur flex flex-col items-center justify-center z-50">
            <div className="w-20 h-20 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin" />
            <p className="mt-4 text-xl text-gray-200">Generating...</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default DemandGeneratorPage; 