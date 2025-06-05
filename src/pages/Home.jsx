import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import characterService from '../services/api/characterService'
import questService from '../services/api/questService'
import diceRollService from '../services/api/diceRollService'

const Home = () => {
  const [activeTab, setActiveTab] = useState('game')
  const [character, setCharacter] = useState(null)
  const [quests, setQuests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadGameData = async () => {
      setLoading(true)
      try {
        const [characterData, questData] = await Promise.all([
          characterService.getAll(),
          questService.getAll()
        ])
        
        // Get or create default character
        if (characterData?.length > 0) {
          setCharacter(characterData[0])
        } else {
          const newCharacter = await characterService.create({
            name: "Hero",
            level: 1,
            experience: 0,
            stats: {
              strength: 10,
              dexterity: 10,
              intelligence: 10
            },
            currentQuestId: null
          })
          setCharacter(newCharacter)
        }
        
        setQuests(questData || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    loadGameData()
  }, [])

  const handleCharacterUpdate = async (updatedCharacter) => {
    try {
      const savedCharacter = await characterService.update(updatedCharacter.id, updatedCharacter)
      setCharacter(savedCharacter)
    } catch (err) {
      setError(err.message)
    }
  }

  const navItems = [
    { id: 'game', label: 'Adventure', icon: 'Sword', active: true },
    { id: 'inventory', label: 'Inventory', icon: 'Package', placeholder: true },
    { id: 'skills', label: 'Skills', icon: 'Zap', placeholder: true },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy', placeholder: true },
    { id: 'settings', label: 'Settings', icon: 'Settings', placeholder: true }
  ]

  const PlaceholderSection = ({ title, description, icon }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-96 text-center"
    >
      <div className="parchment-texture rounded-2xl p-8 shadow-magical border-2 border-secondary-DEFAULT/30">
        <ApperIcon name={icon} className="w-16 h-16 text-secondary-DEFAULT mb-4 mx-auto animate-bounce-slow" />
        <h2 className="font-fantasy text-2xl text-primary-dark mb-4">{title}</h2>
        <p className="font-serif text-primary-DEFAULT">{description}</p>
      </div>
    </motion.div>
  )

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

  return (
    <div className="min-h-screen bg-fantasy-bg">
      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-secondary-DEFAULT rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gradient-to-r from-primary-dark/90 to-primary-DEFAULT/90 backdrop-blur-sm border-b-2 border-secondary-DEFAULT/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <ApperIcon name="Sword" className="w-8 h-8 text-secondary-DEFAULT animate-glow" />
              <h1 className="font-fantasy text-2xl font-bold text-secondary-DEFAULT text-shadow">
                DiceQuest
              </h1>
            </motion.div>

            <nav className="hidden md:flex space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => !item.placeholder && setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === item.id && item.active
                      ? 'bg-secondary-DEFAULT text-primary-dark shadow-magical'
                      : item.placeholder
                      ? 'text-parchment-dark/50 cursor-not-allowed'
                      : 'text-parchment-light hover:bg-primary-light/30 hover:text-secondary-light'
                  }`}
                >
                  <ApperIcon name={item.icon} className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {item.placeholder && (
                    <span className="text-xs bg-accent/20 px-2 py-1 rounded-full">
                      Soon
                    </span>
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="md:hidden p-2 rounded-lg bg-primary-light/30 text-secondary-DEFAULT"
            >
              <ApperIcon name="Menu" className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {activeTab === 'game' ? (
          <MainFeature 
            character={character}
            quests={quests}
            onCharacterUpdate={handleCharacterUpdate}
          />
        ) : activeTab === 'inventory' ? (
          <PlaceholderSection
            title="Your Legendary Backpack"
            description="Collect mystical items, powerful weapons, and ancient artifacts as you progress through your adventures. The inventory system is being forged in the depths of our development dungeon!"
            icon="Package"
          />
        ) : activeTab === 'skills' ? (
          <PlaceholderSection
            title="Skill Trees Await"
            description="Master diverse abilities across multiple skill trees. Combat prowess, magical arts, and survival skills will unlock as you prove yourself worthy. The skill system launches next month!"
            icon="Zap"
          />
        ) : activeTab === 'achievements' ? (
          <PlaceholderSection
            title="Hall of Legends"
            description="Track your greatest accomplishments, rare achievements, and epic milestones. Your legend grows with every quest completed and challenge overcome!"
            icon="Trophy"
          />
        ) : (
          <PlaceholderSection
            title="Game Settings"
            description="Customize your adventure experience with audio controls, visual settings, and save management. Enhanced options and cloud saves are currently in development!"
            icon="Settings"
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-20 bg-primary-dark/80 backdrop-blur-sm border-t-2 border-secondary-DEFAULT/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="font-serif text-parchment-dark">
              Forge your destiny, one roll at a time
            </p>
            <p className="font-sans text-sm text-parchment-dark/70 mt-2">
              © 2024 DiceQuest. All adventures reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home