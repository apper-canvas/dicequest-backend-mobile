import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import GameTemplate from '../templates/GameTemplate'
import characterService from '../../services/api/characterService'
import questService from '../../services/api/questService'
import diceRollService from '../../services/api/diceRollService'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('game')
  const [character, setCharacter] = useState(null)
  const [quests, setQuests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rollHistory, setRollHistory] = useState([])
  const [currentQuest, setCurrentQuest] = useState(null)
  const [questStep, setQuestStep] = useState(0)
  const [showLevelUp, setShowLevelUp] = useState(false)

  const navItems = [
    { id: 'game', label: 'Adventure', icon: 'Sword', active: true },
    { id: 'inventory', label: 'Inventory', icon: 'Package', placeholder: true },
    { id: 'skills', label: 'Skills', icon: 'Zap', placeholder: true },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy', placeholder: true },
    { id: 'settings', label: 'Settings', icon: 'Settings', placeholder: true }
  ]

  const loadGameData = useCallback(async () => {
    setLoading(true)
    try {
      const [characterData, questData, rollData] = await Promise.all([
        characterService.getAll(),
        questService.getAll(),
        diceRollService.getAll()
      ])
      
      let initialCharacter = characterData?.[0]
      if (!initialCharacter) {
        initialCharacter = await characterService.create({
          name: "Hero",
          level: 1,
          experience: 0,
          stats: { strength: 10, dexterity: 10, intelligence: 10 },
          currentQuestId: null
        })
      }
      setCharacter(initialCharacter)
      setQuests(questData || [])
      setRollHistory(rollData?.slice(0, 5) || [])

      if (initialCharacter.currentQuestId) {
        const quest = questData.find(q => q.id === initialCharacter.currentQuestId)
        setCurrentQuest(quest)
      } else if (questData?.length > 0) {
        setCurrentQuest(questData[0])
        await characterService.update(initialCharacter.id, { ...initialCharacter, currentQuestId: questData[0].id })
        setCharacter(prev => ({ ...prev, currentQuestId: questData[0].id }))
      }

    } catch (err) {
      setError(err.message)
      toast.error("Failed to load game data: " + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGameData()
  }, [loadGameData])

  const handleCharacterUpdate = useCallback(async (updatedCharacter) => {
    try {
      const savedCharacter = await characterService.update(updatedCharacter.id, updatedCharacter)
      setCharacter(savedCharacter)
    } catch (err) {
      setError(err.message)
      toast.error("Failed to update character: " + err.message)
    }
  }, [])

  const handleQuestStepComplete = useCallback(async (rollResult) => {
    if (!currentQuest || !character || !rollResult) return

    const requirements = currentQuest.requirements
    const skillCheck = requirements?.skillCheck || 10
    const success = rollResult.total >= skillCheck

    setRollHistory(prev => [{ ...rollResult, total: rollResult.total, id: rollResult.id }, ...prev.slice(0, 4)])

    if (success) {
      toast.success(`🎉 Quest step completed! You rolled ${rollResult.total} vs ${skillCheck}`)
      
      const expGained = currentQuest.rewards?.experience || 50
      const newExp = character.experience + expGained
      const currentLevel = character.level
      const newLevel = Math.floor(newExp / 100) + 1

      let updatedCharacter = { ...character, experience: newExp, level: newLevel }

      if (newLevel > currentLevel) {
        setShowLevelUp(true)
        toast.success(`🌟 Level Up! You reached level ${newLevel}!`, {
          position: "top-center",
          autoClose: 5000
        })
        const stats = ['strength', 'dexterity', 'intelligence']
        const randomStat = stats[Math.floor(Math.random() * stats.length)]
        updatedCharacter.stats = {
          ...character.stats,
          [randomStat]: character.stats[randomStat] + 1
        }
      }

      handleCharacterUpdate(updatedCharacter)
      
      if (questStep < (currentQuest.narrative?.length - 1 || 2)) {
        setQuestStep(prev => prev + 1)
      } else {
        toast.success("🏆 Quest Completed! Choose your next adventure!")
        setQuestStep(0)
        const nextQuest = quests.find(q => q.id !== currentQuest.id)
        if (nextQuest) {
          setCurrentQuest(nextQuest)
          handleCharacterUpdate({ ...updatedCharacter, currentQuestId: nextQuest.id })
        } else {
          toast.info("You've completed all available quests for now! More adventures await.")
          setCurrentQuest(null)
          handleCharacterUpdate({ ...updatedCharacter, currentQuestId: null })
        }
      }
    } else {
      toast.warning(`❌ Failed! You rolled ${rollResult.total} but needed ${skillCheck}. Try again!`)
    }
  }, [character, currentQuest, questStep, quests, handleCharacterUpdate])

  const handleLevelUpClose = useCallback(() => {
    setShowLevelUp(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-secondary-DEFAULT border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20 font-serif">{error}</div>
  }

  return (
    <GameTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      navItems={navItems}
      character={character}
      quests={quests}
      rollHistory={rollHistory}
      currentQuest={currentQuest}
      questStep={questStep}
      showLevelUp={showLevelUp}
      onCharacterUpdate={handleCharacterUpdate}
      onQuestStepComplete={handleQuestStepComplete}
      onLevelUpClose={handleLevelUpClose}
    />
  )
}

export default HomePage