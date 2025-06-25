import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => (
  <header className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-8 text-center shadow-lg">
    <h1 className="text-4xl font-bold">{title}</h1>
    {subtitle && <p className="mt-2 text-lg opacity-90">{subtitle}</p>}
  </header>
)

export default PageHeader 