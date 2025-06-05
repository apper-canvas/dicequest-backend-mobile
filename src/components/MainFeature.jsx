import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import diceRollService from '../services/api/diceRollService'

const MainFeature = ({ character, quests, onCharacterUpdate }) => {
  const [selectedDice, setSelectedDice] = useState('d20')
  const [rollResult, setRollResult] = useState(null)
  const [modifier, setModifier] = useState(0)
  const [isRolling, setIsRolling] = useState(false)
  const [rollHistory, setRollHistory] = useState([])
  const [currentQuest, setCurrentQuest] = useState(null)
  const [questStep, setQuestStep] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)

  const diceTypes = [
    { type: 'd4', sides: 4, color: 'from-blue-400 to-blue-600' },
    { type: 'd6', sides: 6, color: 'from-green-400 to-green-600' },
    { type: 'd8', sides: 8, color: 'from-purple-400 to-purple-600' },
    { type: 'd10', sides: 10, color: 'from-red-400 to-red-600' },
    { type: 'd12', sides: 12, color: 'from-yellow-400 to-yellow-600' },
    { type: 'd20', sides: 20, color: 'from-orange-400 to-orange-600' }
  ]

  useEffect(() => {
    if (character?.currentQuestId && quests?.length > 0) {
      const quest = quests.find(q => q.id === character.currentQuestId)
      setCurrentQuest(quest)
    } else if (quests?.length > 0) {
      setCurrentQuest(quests[0])
    }
  }, [character, quests])

  const calculateStatModifier = (statValue) => {
    return Math.floor((statValue - 10) / 2)
  }

  const rollDice = async () => {
    if (isRolling) return

    setIsRolling(true)
    const dice = diceTypes.find(d => d.type === selectedDice)
    
    // Simulate rolling animation delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
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
      setRollHistory(prev => [{ ...rollData, total, id: savedRoll.id }, ...prev.slice(0, 4)])
      
      // Check for critical results
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

  const completeQuestStep = () => {
    if (!currentQuest || !rollResult) return

    const requirements = currentQuest.requirements
    const skillCheck = requirements?.skillCheck || 10
    const success = rollResult.total >= skillCheck

    if (success) {
      toast.success(`🎉 Quest step completed! You rolled ${rollResult.total} vs ${skillCheck}`)
      
      // Award experience
      const expGained = currentQuest.rewards?.experience || 50
      const newExp = character.experience + expGained
      const currentLevel = character.level
      const newLevel = Math.floor(newExp / 100) + 1

      const updatedCharacter = {
        ...character,
        experience: newExp,
        level: newLevel
      }

      // Check for level up
      if (newLevel > currentLevel) {
        setShowLevelUp(true)
        toast.success(`🌟 Level Up! You reached level ${newLevel}!`, {
          position: "top-center",
          autoClose: 5000
        })
        
        // Increase random stat
        const stats = ['strength', 'dexterity', 'intelligence']
        const randomStat = stats[Math.floor(Math.random() * stats.length)]
        updatedCharacter.stats = {
          ...character.stats,
          [randomStat]: character.stats[randomStat] + 1
        }
      }

      onCharacterUpdate(updatedCharacter)
      
      // Progress quest or complete it
      if (questStep < (currentQuest.narrative?.length - 1 || 2)) {
        setQuestStep(prev => prev + 1)
      } else {
        toast.success("🏆 Quest Completed! Choose your next adventure!")
        setQuestStep(0)
        const nextQuest = quests.find(q => q.id !== currentQuest.id)
        if (nextQuest) {
          setCurrentQuest(nextQuest)
          onCharacterUpdate({ ...updatedCharacter, currentQuestId: nextQuest.id })
        }
      }
    } else {
      toast.warning(`❌ Failed! You rolled ${rollResult.total} but needed ${skillCheck}. Try again!`)
    }

    setRollResult(null)
  }

  const updateCharacterName = async (newName) => {
    if (newName.trim() && character) {
      const updatedCharacter = { ...character, name: newName.trim() }
      onCharacterUpdate(updatedCharacter)
      toast.success("Character name updated!")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        
        {/* Character Panel */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30"
          >
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-light to-primary-dark rounded-full flex items-center justify-center mb-3 shadow-dice">
                  <ApperIcon name="User" className="w-10 h-10 text-secondary-DEFAULT" />
                </div>
                <div className="absolute -top-2 -right-2 bg-secondary-DEFAULT text-primary-dark text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {character?.level || 1}
                </div>
              </div>
              
              <input
                type="text"
                value={character?.name || 'Hero'}
                onChange={(e) => updateCharacterName(e.target.value)}
                className="font-fantasy text-xl font-bold text-primary-dark bg-transparent border-none text-center w-full outline-none focus:bg-white/20 rounded px-2 py-1"
                maxLength={20}
              />
            </div>

            {/* XP Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm font-medium text-primary-dark mb-1">
                <span>Experience</span>
                <span>{character?.experience || 0} / {((character?.level || 1) * 100)}</span>
              </div>
              <div className="w-full bg-primary-light/30 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-secondary-dark to-secondary-DEFAULT h-3 rounded-full shadow-sm"
                  style={{ width: `${((character?.experience || 0) % 100)}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((character?.experience || 0) % 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              {character?.stats && Object.entries(character.stats).map(([stat, value]) => (
                <div key={stat} className="stat-block rounded-lg p-3">
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
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Game Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Dice Roller */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30"
          >
            <h2 className="font-fantasy text-2xl font-bold text-primary-dark mb-6 text-center">
              Dice of Destiny
            </h2>

            {/* Dice Selection */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
              {diceTypes.map((dice) => (
                <motion.button
                  key={dice.type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDice(dice.type)}
                  className={`aspect-square rounded-xl border-2 transition-all duration-300 ${
                    selectedDice === dice.type
                      ? 'border-secondary-DEFAULT shadow-magical scale-105'
                      : 'border-primary-light/50 hover:border-secondary-light'
                  } bg-gradient-to-br ${dice.color} text-white font-bold text-lg shadow-dice`}
                >
                  {dice.type.toUpperCase()}
                </motion.button>
              ))}
            </div>

            {/* Modifier Input */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <label className="font-medium text-primary-dark">Modifier:</label>
              <input
                type="number"
                value={modifier}
                onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                className="w-20 px-3 py-2 border-2 border-primary-light rounded-lg text-center font-bold text-primary-dark bg-white/80"
                min="-10"
                max="10"
              />
            </div>

            {/* Roll Button */}
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

            {/* Roll Result */}
            <AnimatePresence>
              {rollResult && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="text-center p-6 bg-gradient-to-r from-secondary-DEFAULT/20 to-secondary-light/20 rounded-xl border-2 border-secondary-DEFAULT"
                >
                  <div className="text-4xl font-bold text-primary-dark mb-2">
                    {rollResult.total}
                  </div>
                  <div className="text-sm text-primary-DEFAULT">
                    {rollResult.diceType}: {rollResult.result} + {rollResult.modifier}
                  </div>
                  
                  {currentQuest && (
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      onClick={completeQuestStep}
                      className="mt-4 px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      Apply to Quest
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Roll History */}
          {rollHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30"
            >
              <h3 className="font-fantasy text-lg font-bold text-primary-dark mb-4">Recent Rolls</h3>
              <div className="space-y-2">
                {rollHistory.map((roll, index) => (
                  <motion.div
                    key={roll.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-white/20 rounded-lg"
                  >
                    <span className="text-primary-dark">
                      {roll.diceType}: {roll.result} + {roll.modifier}
                    </span>
                    <span className="font-bold text-primary-dark">{roll.total}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Quest Panel */}
        <div className="lg:col-span-1 space-y-6">
          {currentQuest && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30 h-full"
            >
              <h3 className="font-fantasy text-xl font-bold text-primary-dark mb-4">
                {currentQuest.title}
              </h3>
              
              <div className="quest-scroll max-h-64 overflow-y-auto mb-4">
                <p className="font-serif text-primary-DEFAULT leading-relaxed">
                  {currentQuest.narrative?.[questStep] || currentQuest.description}
                </p>
              </div>

              {currentQuest.requirements && (
                <div className="bg-primary-light/20 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-primary-dark mb-2">Required Roll:</h4>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Target" className="w-4 h-4 text-accent" />
                    <span className="font-bold text-primary-dark">
                      {currentQuest.requirements.skillCheck || 10}+
                    </span>
                  </div>
                </div>
              )}

              {currentQuest.rewards && (
                <div className="bg-secondary-DEFAULT/20 rounded-lg p-4">
                  <h4 className="font-medium text-primary-dark mb-2">Rewards:</h4>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Star" className="w-4 h-4 text-secondary-dark" />
                    <span className="text-primary-dark">
                      {currentQuest.rewards.experience || 50} XP
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowLevelUp(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="parchment-texture rounded-2xl p-8 shadow-magical border-4 border-secondary-DEFAULT max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                >
                  <ApperIcon name="Star" className="w-16 h-16 text-secondary-DEFAULT mx-auto mb-4" />
                </motion.div>
                <h2 className="font-fantasy text-3xl font-bold text-primary-dark mb-4">
                  Level Up!
                </h2>
                <p className="font-serif text-primary-DEFAULT mb-6">
                  Your adventures have made you stronger! You've reached level {character?.level}!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLevelUp(false)}
                  className="px-6 py-3 bg-secondary-DEFAULT text-primary-dark font-bold rounded-xl shadow-magical hover:bg-secondary-light transition-colors"
                >
                  Continue Adventure
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature