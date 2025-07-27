import Logo from './Logo'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center">
          <Logo size="large" />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-3">
            Analyze your JavaScript code and understand its time complexity with clear, beginner-friendly explanations
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header 