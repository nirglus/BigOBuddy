const AnalysisResults = ({ result }) => {
  if (!result) return null

  return (
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
        
        {result.loopSummary && result.loopSummary.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">📊 Loop Breakdown</h3>
            <div className="space-y-2">
              {result.loopSummary.map((summary, index) => (
                <div key={index} className="text-sm text-slate-700 font-mono bg-white px-3 py-2 rounded border">
                  {summary}
                </div>
              ))}
            </div>
            {result.loopSummary.length > 1 && (
              <div className="mt-3 text-sm text-slate-600">
                <strong>Total complexity:</strong> {result.complexity}
              </div>
            )}
          </div>
        )}
        
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
  )
}

export default AnalysisResults 