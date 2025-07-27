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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simple code pattern analysis
      const codeLower = code.toLowerCase()
      const forLoops = codeLower.match(/for\s*\(/g) || []
      const loopCount = forLoops.length
      
      console.log('Debug - Code analysis:', {
        codeLower: codeLower.substring(0, 100) + '...',
        loopCount,
        hasFor: codeLower.includes('for'),
        hasI: codeLower.includes('i'),
        hasJ: codeLower.includes('j'),
        hasN: codeLower.includes('n'),
        hasM: codeLower.includes('m')
      })
      
      // Check for nested loops by looking for loops that might be nested
      // This is a simplified check - in a real implementation, you'd need more sophisticated parsing
      const hasNestedLoops = loopCount > 1 && 
                            codeLower.includes('for') && 
                            codeLower.includes('{') && codeLower.includes('}') &&
                            // Look for patterns that suggest nesting (like i and j loops)
                            ((codeLower.includes('i') && codeLower.includes('j')) ||
                             (codeLower.includes('i++') && codeLower.includes('j++')))
      
      // Check for sequential loops (separate loops that run one after another)
      // This is the most common case for code snippets
      const hasSequentialLoops = loopCount > 1 && !hasNestedLoops
      
      const hasSingleLoop = loopCount === 1
      
      const hasRecursion = codeLower.includes('function') && codeLower.includes('(') && 
                          (codeLower.includes('return') || codeLower.includes('call'))
      
      console.log('Debug - Pattern detection:', {
        hasNestedLoops,
        hasSequentialLoops,
        hasSingleLoop,
        hasRecursion
      })
      
      let complexity, explanation, optimization
      
      if (hasNestedLoops) {
        complexity = 'O(n²)'
        explanation = 'This code contains nested loops where the outer loop iterates n times and the inner loop also iterates n times, resulting in n × n = n² operations.'
        optimization = 'Consider using a hash map or other data structure to reduce the time complexity to O(n).'
      } else if (hasSequentialLoops) {
        complexity = 'O(N+M)'
        explanation = 'This code has multiple separate loops that run sequentially. Since they are not nested, the total time complexity is the sum of all loops: O(N+M) where N and M represent the number of iterations in each loop.'
        optimization = 'This is already quite efficient for sequential operations. Consider if the loops can be combined into a single pass if they operate on the same data.'
      } else if (hasSingleLoop) {
        complexity = 'O(n)'
        explanation = 'This code contains a single loop that iterates n times, resulting in linear time complexity.'
        optimization = 'This is already optimal for a single pass through the data. Consider if the loop can be vectorized or parallelized for better performance.'
      } else if (hasRecursion) {
        complexity = 'O(log n)'
        explanation = 'This code appears to use recursion, which typically results in logarithmic time complexity depending on how the problem is divided.'
        optimization = 'Consider if the recursion can be converted to iteration to avoid stack overflow for large inputs.'
      } else {
        complexity = 'O(1)'
        explanation = 'This code performs a constant number of operations regardless of input size.'
        optimization = 'This is already optimal. No further optimization needed for time complexity.'
      }
      
      const mockResult = {
        complexity,
        explanation,
        optimization,
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
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }
  }

  const clearAll = () => {
    setCode('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              BigO Buddy
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Analyze your JavaScript code and understand its time complexity with clear, beginner-friendly explanations
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Code Input Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Code Analysis</h2>
              {code && (
                <button
                  onClick={clearAll}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              <label htmlFor="code-input" className="block text-sm font-medium text-slate-700">
                Paste your JavaScript code:
              </label>
              <textarea
                id="code-input"
                className="w-full h-64 p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm bg-slate-50"
                placeholder="// Example:&#10;function findDuplicates(arr) {&#10;  const duplicates = [];&#10;  for (let i = 0; i < arr.length; i++) {&#10;    for (let j = i + 1; j < arr.length; j++) {&#10;      if (arr[i] === arr[j]) {&#10;        duplicates.push(arr[i]);&#10;      }&#10;    }&#10;  }&#10;  return duplicates;&#10;}"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={analyzeCode}
                disabled={loading || !code.trim()}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  loading || !code.trim()
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95'
                }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze Code'
                )}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Analysis Results</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  {result.complexity}
                </span>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Time Complexity</h3>
                  <p className="text-slate-700 leading-relaxed">{result.explanation}</p>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">💡 Optimization Suggestion</h3>
                  <p className="text-slate-700 leading-relaxed">{result.optimization}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Analyzed Code</h3>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm font-mono">
                    <code>{result.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-slate-500 text-sm">
            BigO Buddy - Helping developers understand algorithm complexity
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
