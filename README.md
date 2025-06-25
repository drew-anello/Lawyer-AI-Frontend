# Legal Demand Letter Generator

A modern, professional web application for generating legal demand letters. This React-based frontend interfaces with a FastAPI backend to create customized demand letters using AI.

## Features

- **Professional UI**: Clean, modern interface designed for legal professionals
- **Comprehensive Form**: Capture all necessary information for demand letter generation
- **Real-time Generation**: Instant demand letter creation using AI
- **Letter Management**: View, copy, and manage generated letters
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Backend API running on `http://localhost:8000`

## Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd lawyer-ai-frontend
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Fill out the form** with the following information:

   - Client name
   - Opposing party name
   - Legal matter type
   - Date of incident
   - Nature of dispute
   - Damages suffered
   - Desired resolution
   - Deadline (in days, default is 14)

2. **Generate the letter** by clicking the "Generate Demand Letter" button

3. **Review the generated letter** with metadata including:

   - Client and opposing party information
   - Deadline date
   - Generation timestamp

4. **Copy or manage** the letter using the provided actions:
   - Copy to clipboard
   - Return to form
   - Create a new letter

## API Integration

The frontend expects the backend API to be running at `http://localhost:8000/demand` with the following endpoint:

- `POST /generate-demand-letter`: Generates a demand letter based on provided information

### Request Format

```json
{
	"client_name": "string",
	"opposing_party": "string",
	"legal_matter": "string",
	"date_of_incident": "string",
	"nature_of_dispute": "string",
	"damages_suffered": "string",
	"desired_resolution": "string",
	"deadline_days": 14
}
```

### Response Format

```json
{
	"success": true,
	"demand_letter": "string",
	"metadata": {
		"client": "string",
		"opposing_party": "string",
		"deadline_date": "string",
		"generated_at": "string"
	}
}
```

## Development

### Project Structure

```
src/
├── App.tsx          # Main application component
├── App.css          # Application styles
├── main.tsx         # Application entry point
├── index.css        # Global styles
└── vite-env.d.ts    # TypeScript declarations
```

### Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 with modern features

## Troubleshooting

### Backend Connection Error

If you see "Failed to connect to the server", ensure:

1. The backend API is running on `http://localhost:8000`
2. CORS is properly configured on the backend
3. The `/demand/generate-demand-letter` endpoint is accessible

### Form Validation

All fields marked with \* are required. The form will not submit without completing these fields.

## License

[Your License Here]

## Contributing

[Your Contributing Guidelines Here]
