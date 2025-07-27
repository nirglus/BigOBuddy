const Logo = ({ size = 'large' }) => {
  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  }
  
  return (
    <div className={`font-bold ${sizeClasses[size]} text-center`}>
      <span className="text-slate-700">Big </span>
      <span className="text-indigo-600">O(N)</span>
      <span className="text-slate-700"> Buddy</span>
    </div>
  )
}

export default Logo 