import React from 'react'
import Text from '../atoms/Text'

const ModifierInput = ({ modifier, setModifier }) => (
  <div className="flex items-center justify-center space-x-4 mb-6">
    <Text type="label">Modifier:</Text>
    <input
      type="number"
      value={modifier}
      onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
      className="w-20 px-3 py-2 border-2 border-primary-light rounded-lg text-center font-bold text-primary-dark bg-white/80"
      min="-10"
      max="10"
    />
  </div>
)

export default ModifierInput