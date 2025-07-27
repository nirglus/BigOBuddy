import Logo from './Logo'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-200 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-8 text-center">
        <Logo size="small" />
        <p className="text-slate-500 text-sm mt-2">
          Helping developers understand algorithm complexity
        </p>
      </div>
    </footer>
  )
}

export default Footer 