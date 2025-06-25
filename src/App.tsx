import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DemandGeneratorPage from './pages/DemandGenerator'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemandGeneratorPage />} />
        {/* Future pages can be added here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
