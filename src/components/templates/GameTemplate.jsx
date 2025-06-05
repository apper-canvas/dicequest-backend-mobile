import React from 'react'
import { motion } from 'framer-motion'
import GameHeader from '../organisms/GameHeader'
import CharacterPanel from '../organisms/CharacterPanel'
import DiceRoller from '../organisms/DiceRoller'
import RollHistory from '../organisms/RollHistory'
import QuestPanel from '../organisms/QuestPanel'
import PlaceholderSection from '../atoms/PlaceholderSection'
import LevelUpModal from '../organisms/LevelUpModal'
import Text from '../atoms/Text'

const GameTemplate = ({ 
  activeTab, 
  setActiveTab, 
  navItems, 
  character, 
  quests, 
  rollHistory, 
  currentQuest, 
  questStep, 
  showLevelUp, 
  onCharacterUpdate, 
  onQuestStepComplete, 
  onLevelUpClose 
}) => {
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

      <GameHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        navItems={navItems} 
      />

      <main className="relative z-10">
        {activeTab === 'game' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
              <CharacterPanel 
                character={character} 
                onCharacterUpdate={onCharacterUpdate} 
              />
              <div className="lg:col-span-2 space-y-6">
                <DiceRoller 
                  character={character}
                  currentQuest={currentQuest}
                  onQuestStepComplete={onQuestStepComplete}
                />
                <RollHistory history={rollHistory} />
              </div>
              <QuestPanel 
                currentQuest={currentQuest} 
                questStep={questStep} 
              />
            </div>
          </div>
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

      <footer className="relative z-10 mt-20 bg-primary-dark/80 backdrop-blur-sm border-t-2 border-secondary-DEFAULT/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Text type="p-footer">
              Forge your destiny, one roll at a time
            </Text>
            <Text type="p-sm-footer">
              © 2024 DiceQuest. All adventures reserved.
            </Text>
          </div>
        </div>
      </footer>

      <LevelUpModal 
        show={showLevelUp} 
        onClose={onLevelUpClose} 
        characterLevel={character?.level} 
      />
    </div>
  )
}

export default GameTemplate