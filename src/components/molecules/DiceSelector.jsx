import React from 'react'
import DiceButton from '../atoms/DiceButton'

const DiceSelector = ({ selectedDice, setSelectedDice }) => {
  const diceTypes = [
    { type: 'd4', sides: 4, color: 'from-blue-400 to-blue-600' },
    { type: 'd6', sides: 6, color: 'from-green-400 to-green-600' },
    { type: 'd8', sides: 8, color: 'from-purple-400 to-purple-600' },
    { type: 'd10', sides: 10, color: 'from-red-400 to-red-600' },
    { type: 'd12', sides: 12, color: 'from-yellow-400 to-yellow-600' },
    { type: 'd20', sides: 20, color: 'from-orange-400 to-orange-600' }
  ]

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
      {diceTypes.map((dice) => (
        <DiceButton
          key={dice.type}
          type={dice.type}
          sides={dice.sides}
          color={dice.color}
          isSelected={selectedDice === dice.type}
          onClick={() => setSelectedDice(dice.type)}
        />
      ))}
    </div>
  )
}

export default DiceSelector