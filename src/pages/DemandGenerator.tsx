import { useState } from 'react'
import '../App.css'
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
  }

  const handleCopyLetter = () => {
    if (response?.demand_letter) {
      navigator.clipboard.writeText(response.demand_letter)
      alert('Demand letter copied to clipboard!')
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Demand Letter Generator</h1>
        <p>Generate professional demand letters for your legal practice</p>
      </header>

      <main className="main-content">
        {!showLetter ? (
          <form onSubmit={handleSubmit} className="demand-form">
            {/* form sections same as before */}
            <div className="form-section">
              <h2>Client Information</h2>
              <div className="form-group">
                <label htmlFor="client_name">Client Name *</label>
                <input
                  type="text"
                  id="client_name"
                  name="client_name"
                  value={formData.client_name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe or ABC Corporation"
                />
              </div>

              <div className="form-group">
                <label htmlFor="opposing_party">Opposing Party *</label>
                <input
                  type="text"
                  id="opposing_party"
                  name="opposing_party"
                  value={formData.opposing_party}
                  onChange={handleInputChange}
                  required
                  placeholder="Jane Smith or XYZ Company"
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Case Details</h2>
              <div className="form-group">
                <label htmlFor="legal_matter">Legal Matter *</label>
                <input
                  type="text"
                  id="legal_matter"
                  name="legal_matter"
                  value={formData.legal_matter}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., breach of contract, personal injury, property damage"
                />
              </div>

              <div className="form-group">
                <label htmlFor="date_of_incident">Date of Incident *</label>
                <input
                  type="date"
                  id="date_of_incident"
                  name="date_of_incident"
                  value={formData.date_of_incident}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="nature_of_dispute">Nature of Dispute *</label>
                <textarea
                  id="nature_of_dispute"
                  name="nature_of_dispute"
                  value={formData.nature_of_dispute}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe the circumstances and facts of the dispute..."
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Damages & Resolution</h2>
              <div className="form-group">
                <label htmlFor="damages_suffered">Damages Suffered *</label>
                <textarea
                  id="damages_suffered"
                  name="damages_suffered"
                  value={formData.damages_suffered}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="e.g., $50,000 in lost revenue, medical expenses, property damage..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="desired_resolution">Desired Resolution *</label>
                <textarea
                  id="desired_resolution"
                  name="desired_resolution"
                  value={formData.desired_resolution}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="e.g., Payment of $50,000, cease and desist, specific performance..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="deadline_days">Deadline (days)</label>
                <input
                  type="number"
                  id="deadline_days"
                  name="deadline_days"
                  value={formData.deadline_days}
                  onChange={handleInputChange}
                  min="1"
                  max="90"
                  placeholder="14"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'Generating...' : 'Generate Demand Letter'}
              </button>
              <button type="button" className="btn-secondary" onClick={handleReset}>
                Clear Form
              </button>
            </div>
          </form>
        ) : (
          <div className="letter-display">
            {response?.success && response.demand_letter && (
              <>
                <div className="letter-metadata">
                  <h3>Generated Demand Letter</h3>
                  <div className="metadata-grid">
                    <div>
                      <strong>Client:</strong> {response.metadata?.client}
                    </div>
                    <div>
                      <strong>Opposing Party:</strong> {response.metadata?.opposing_party}
                    </div>
                    <div>
                      <strong>Deadline:</strong> {response.metadata?.deadline_date}
                    </div>
                    <div>
                      <strong>Generated:</strong> {new Date(response.metadata?.generated_at || '').toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="letter-content">
                  <pre>{response.demand_letter}</pre>
                </div>

                <div className="letter-actions">
                  <button className="btn-primary" onClick={handleCopyLetter}>
                    Copy to Clipboard
                  </button>
                  <button className="btn-secondary" onClick={() => setShowLetter(false)}>
                    ← Back to Form
                  </button>
                  <button className="btn-secondary" onClick={handleReset}>
                    Create New Letter
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {response?.error && (
          <div className="error-message">
            <strong>Error:</strong> {response.error}
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <p className="loading-text">Generating...</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default DemandGeneratorPage; 