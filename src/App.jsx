import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import CodeInput from './components/CodeInput'
import ErrorDisplay from './components/ErrorDisplay'
import AnalysisResults from './components/AnalysisResults'
import Footer from './components/Footer'
import { analyzeCodeComplexity } from './utils/codeAnalyzer'

function App() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Use the utility function for analysis
      const analysisResult = analyzeCodeComplexity(code)
      setResult(analysisResult)
    } catch (err) {
      setError('Failed to analyze code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setCode('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <CodeInput 
            code={code}
            setCode={setCode}
            onAnalyze={analyzeCode}
            loading={loading}
            onClear={clearAll}
          />
          
          <ErrorDisplay error={error} />
          <AnalysisResults result={result} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
