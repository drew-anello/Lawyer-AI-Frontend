import React from 'react'

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

interface DemandFormProps {
  formData: DemandLetterData
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onReset: () => void
  loading: boolean
  consentChecked: boolean
  setConsentChecked: (v: boolean) => void
}

const inputClasses = 'w-full p-3 px-4 border-2 border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900 focus:ring-4 focus:ring-purple-600/40'
const labelClasses = 'block text-gray-200 font-semibold mb-2'
const sectionHeadingClasses = 'text-purple-500 text-xl mb-6 pb-2 border-b-2 border-purple-600/60'
const primaryButtonClasses = 'bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition disabled:opacity-60 disabled:cursor-not-allowed'
const secondaryButtonClasses = 'bg-gray-700 text-gray-200 px-8 py-3 rounded-md font-semibold hover:bg-gray-600'

const DemandForm: React.FC<DemandFormProps> = ({ formData, onInputChange, onSubmit, onReset, loading, consentChecked, setConsentChecked }) => (
  <form onSubmit={onSubmit} className="bg-neutral-900 rounded-xl shadow-lg p-8">
    {/* Client Information */}
    <div className="mb-10">
      <h2 className={sectionHeadingClasses}>Client Information</h2>
      <div className="mb-6">
        <label htmlFor="client_name" className={labelClasses}>Client Name *</label>
        <input
          type="text"
          id="client_name"
          name="client_name"
          value={formData.client_name}
          onChange={onInputChange}
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
          onChange={onInputChange}
          required
          placeholder="Jane Smith or XYZ Company"
          className={inputClasses}
        />
      </div>
    </div>

    {/* Case Details */}
    <div className="mb-10">
      <h2 className={sectionHeadingClasses}>Case Details</h2>
      <div className="mb-6">
        <label htmlFor="legal_matter" className={labelClasses}>Legal Matter *</label>
        <input
          type="text"
          id="legal_matter"
          name="legal_matter"
          value={formData.legal_matter}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          required
          rows={4}
          placeholder="Describe the circumstances and facts of the dispute..."
          className={inputClasses}
        />
      </div>
    </div>

    {/* Damages & Resolution */}
    <div className="mb-10">
      <h2 className={sectionHeadingClasses}>Damages & Resolution</h2>
      <div className="mb-6">
        <label htmlFor="damages_suffered" className={labelClasses}>Damages Suffered *</label>
        <textarea
          id="damages_suffered"
          name="damages_suffered"
          value={formData.damages_suffered}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          min="1"
          max="90"
          placeholder="14"
          className={inputClasses}
        />
      </div>
    </div>

    {/* Consent */}
    <div className="my-6 flex items-start gap-3">
      <input
        type="checkbox"
        id="consent"
        checked={consentChecked}
        onChange={e => setConsentChecked(e.target.checked)}
        className="mt-1 h-5 w-5 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-600/50 focus:ring-2"
      />
      <label htmlFor="consent" className="text-sm text-gray-300 select-none">
        I acknowledge that this AI may produce inaccurate information. I will review the generated document for accuracy and accept sole responsibility for its contents.
      </label>
    </div>

    {/* Actions */}
    <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-gray-800">
      <button type="submit" className={primaryButtonClasses} disabled={loading || !consentChecked}>
        {loading ? 'Generating...' : 'Generate Demand Letter'}
      </button>
      <button type="button" className={secondaryButtonClasses} onClick={onReset}>
        Clear Form
      </button>
    </div>
  </form>
)

export default DemandForm 