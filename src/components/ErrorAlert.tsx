import React from 'react'

interface ErrorAlertProps {
  message: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => (
  <div className="bg-rose-900 border border-rose-700 text-rose-300 p-6 rounded-md mt-8">
    <strong>Error:</strong> {message}
  </div>
)

export default ErrorAlert 