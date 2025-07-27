const CodeInput = ({ code, setCode, onAnalyze, loading, onClear }) => {
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Code Analysis</h2>
        {code && (
          <button
            onClick={onClear}
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
          onClick={onAnalyze}
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
  )
}

export default CodeInput 