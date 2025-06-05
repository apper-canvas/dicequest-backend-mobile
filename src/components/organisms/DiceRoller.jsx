import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../atoms/ApperIcon'
import Text from '../atoms/Text'
import DiceSelector from '../molecules/DiceSelector'
import ModifierInput from '../molecules/ModifierInput'
import RollResultDisplay from '../molecules/RollResultDisplay'
import diceRollService from '../../services/api/diceRollService'

const DiceRoller = ({ character, currentQuest, onQuestStepComplete }) => {
  const [selectedDice, setSelectedDice] = useState('d20')
  const [rollResult, setRollResult] = useState(null)
  const [modifier, setModifier] = useState(0)
  const [isRolling, setIsRolling] = useState(false)

  const diceTypes = [
    { type: 'd4', sides: 4, color: 'from-blue-400 to-blue-600' },
    { type: 'd6', sides: 6, color: 'from-green-400 to-green-600' },
    { type: 'd8', sides: 8, color: 'from-purple-400 to-purple-600' },
    { type: 'd10', sides: 10, color: 'from-red-400 to-red-600' },
    { type: 'd12', sides: 12, color: 'from-yellow-400 to-yellow-600' },
    { type: 'd20', sides: 20, color: 'from-orange-400 to-orange-600' }
  ]

  const rollDice = async () => {
    if (isRolling) return

    setIsRolling(true)
    const dice = diceTypes.find(d => d.type === selectedDice)
    
    await new Promise(resolve => setTimeout(resolve, 800)) // Simulate rolling animation delay
    
    const roll = Math.floor(Math.random() * dice.sides) + 1
    const total = roll + modifier
    
    const rollData = {
      diceType: selectedDice,
      result: roll,
      modifier: modifier,
      purpose: currentQuest ? `Quest: ${currentQuest.title}` : 'Free roll'
    }

    try {
      const savedRoll = await diceRollService.create(rollData)
      setRollResult({ ...rollData, total, id: savedRoll.id })
      
      if (roll === dice.sides) {
        toast.success("🎯 Critical Success! The dice gods smile upon you!", {
          position: "top-center",
          className: "!bg-green-600"
        })
      } else if (roll === 1) {
        toast.error("💀 Critical Failure! Perhaps the dice are cursed...", {
          position: "top-center",
          className: "!bg-red-600"
        })
      }
    } catch (error) {
      toast.error("Failed to record dice roll")
    }
    
    setIsRolling(false)
  }

  const handleApplyToQuest = () => {
    if (!currentQuest || !rollResult) return
    onQuestStepComplete(rollResult)
    setRollResult(null)
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30"
    >
      <Text type="h2">Dice of Destiny</Text>

      <DiceSelector 
        selectedDice={selectedDice} 
        setSelectedDice={setSelectedDice} 
      />

      <ModifierInput 
        modifier={modifier} 
        setModifier={setModifier} 
      />

      <div className="text-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={rollDice}
          disabled={isRolling}
          className={`px-8 py-4 bg-gradient-to-r from-secondary-dark to-secondary-DEFAULT text-primary-dark font-bold text-xl rounded-xl shadow-magical border-2 border-secondary-light transition-all duration-300 ${
            isRolling 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isRolling ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <ApperIcon name="Dice6" className="w-6 h-6" />
            </motion.div>
          ) : (
            'Roll the Dice!'
          )}
        </motion.button>
      </div>

      <RollResultDisplay 
        rollResult={rollResult} 
        currentQuest={currentQuest} 
        onApplyToQuest={handleApplyToQuest} 
      />
    </motion.div>
  )
}

export default DiceRoller