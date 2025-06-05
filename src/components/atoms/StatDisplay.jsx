import React from 'react'

const calculateStatModifier = (statValue) => {
  return Math.floor((statValue - 10) / 2)
}

const StatDisplay = ({ stat, value }) => (
  <div className="stat-block rounded-lg p-3">
    <div className="flex justify-between items-center">
      <span className="font-medium text-primary-dark capitalize">{stat}</span>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-primary-dark">{value}</span>
        <span className={`text-sm px-2 py-1 rounded ${
          calculateStatModifier(value) >= 0 
            ? 'bg-green-200 text-green-800' 
            : 'bg-red-200 text-red-800'
        }`}>
          {calculateStatModifier(value) >= 0 ? '+' : ''}{calculateStatModifier(value)}
        </span>
      </div>
    </div>
  </div>
)

export default StatDisplay