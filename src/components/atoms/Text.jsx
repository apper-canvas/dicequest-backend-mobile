import React from 'react'

const Text = ({ type = 'p', children, className = '' }) => {
  switch (type) {
    case 'h1':
      return <h1 className={`font-fantasy text-2xl font-bold text-secondary-DEFAULT text-shadow ${className}`}>{children}</h1>
    case 'h2':
      return <h2 className={`font-fantasy text-2xl font-bold text-primary-dark mb-6 text-center ${className}`}>{children}</h2>
    case 'h3':
      return <h3 className={`font-fantasy text-xl font-bold text-primary-dark mb-4 ${className}`}>{children}</h3>
    case 'h4':
      return <h4 className={`font-medium text-primary-dark mb-2 ${className}`}>{children}</h4>
    case 'span':
      return <span className={`text-primary-dark ${className}`}>{children}</span>
    case 'label':
      return <label className={`font-medium text-primary-dark ${className}`}>{children}</label>
    case 'p-serif':
        return <p className={`font-serif text-primary-DEFAULT leading-relaxed ${className}`}>{children}</p>
    case 'p-footer':
        return <p className={`font-serif text-parchment-dark ${className}`}>{children}</p>
    case 'p-sm-footer':
        return <p className={`font-sans text-sm text-parchment-dark/70 mt-2 ${className}`}>{children}</p>
    case 'input':
        return <input className={`w-20 px-3 py-2 border-2 border-primary-light rounded-lg text-center font-bold text-primary-dark bg-white/80 ${className}`} />
    default:
      return <p className={`font-serif text-primary-DEFAULT ${className}`}>{children}</p>
  }
}

export default Text