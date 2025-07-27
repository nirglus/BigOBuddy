const Header = () => {
  return (
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
  )
}

export default Header 