import { useState } from 'react'
import { useApiUrl  } from '../Hooks/api'
import PageHeader from '../components/PageHeader'
import DemandForm from '../components/DemandForm'
import LetterEditor from '../components/LetterEditor'
import LoadingOverlay from '../components/LoadingOverlay'
import ErrorAlert from '../components/ErrorAlert'

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
  const [consentChecked, setConsentChecked] = useState(false)

  const apiUrl = useApiUrl()
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'deadline_days' ? parseInt(value) || 14 : value
    }))
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#1f004d] text-gray-200">
      <PageHeader title="Demand Letter Generator" subtitle="Generate professional demand letters for your legal practice" />

      <main className="max-w-4xl mx-auto p-8">
        {!showLetter && (
          <DemandForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onReset={handleReset}
            loading={loading}
            consentChecked={consentChecked}
            setConsentChecked={setConsentChecked}
          />
        )}

        {showLetter && response?.success && response.demand_letter && response.metadata && (
          <LetterEditor
            letter={response.demand_letter}
            metadata={response.metadata}
            onBack={() => setShowLetter(false)}
            onReset={handleReset}
          />
        )}

        {response?.error && <ErrorAlert message={response.error} />}

        {loading && <LoadingOverlay />}
      </main>
    </div>
  )
}

export default DemandGeneratorPage; 