import { useState } from 'react'
import './App.css'

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
      // For now, we'll simulate the API call
      // In a real implementation, you would call your backend API here
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API delay
      
      // Mock response - replace this with actual API call
      const mockResult = {
        complexity: 'O(n²)',
        explanation: 'This code has a nested loop structure where the outer loop iterates n times and the inner loop also iterates n times, resulting in n × n = n² operations.',
        optimization: 'Consider using a more efficient algorithm like a hash map to reduce the time complexity to O(n).',
        code: code
      }
      
      setResult(mockResult)
    } catch (err) {
      setError('Failed to analyze code. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)
      // Set cursor position after the tab
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            BigO Buddy
          </h1>
          <p className="text-lg text-gray-600">
            Analyze your JavaScript code and understand its time complexity
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          {/* Code Input Section */}
          <div className="mb-6">
            <label htmlFor="code-input" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your JavaScript code here:
            </label>
            <textarea
              id="code-input"
              className="code-input"
              placeholder="// Example:&#10;function findDuplicates(arr) {&#10;  const duplicates = [];&#10;  for (let i = 0; i < arr.length; i++) {&#10;    for (let j = i + 1; j < arr.length; j++) {&#10;      if (arr[i] === arr[j]) {&#10;        duplicates.push(arr[i]);&#10;      }&#10;    }&#10;  }&#10;  return duplicates;&#10;}"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Analyze Button */}
          <div className="text-center mb-6">
            <button
              onClick={analyzeCode}
              disabled={loading}
              className={`analyze-btn ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </div>
              ) : (
                'Analyze Code'
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="result-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
                <span className="complexity-badge">{result.complexity}</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Time Complexity</h3>
                  <p className="text-gray-600 leading-relaxed">{result.explanation}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Optimization Suggestion</h3>
                  <p className="text-gray-600 leading-relaxed">{result.optimization}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Analyzed Code</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                    <code className="text-gray-800">{result.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>BigO Buddy - Helping developers understand algorithm complexity</p>
        </div>
      </div>
    </div>
  )
}

export default App
