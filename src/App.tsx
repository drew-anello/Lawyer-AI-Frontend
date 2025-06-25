import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DemandGeneratorPage from './pages/DemandGenerator'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemandGeneratorPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
