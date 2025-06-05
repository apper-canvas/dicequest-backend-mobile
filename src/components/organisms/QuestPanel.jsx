import React from 'react'
import { motion } from 'framer-motion'
import Text from '../atoms/Text'
import QuestRequirement from '../molecules/QuestRequirement'
import QuestRewards from '../molecules/QuestRewards'

const QuestPanel = ({ currentQuest, questStep }) => {
  if (!currentQuest) return null

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30 h-full"
    >
      <Text type="h3">
        {currentQuest.title}
      </Text>
      
      <div className="quest-scroll max-h-64 overflow-y-auto mb-4">
        <Text type="p-serif">
          {currentQuest.narrative?.[questStep] || currentQuest.description}
        </Text>
      </div>

      {currentQuest.requirements && (
        <QuestRequirement skillCheck={currentQuest.requirements.skillCheck} />
      )}

      {currentQuest.rewards && (
        <QuestRewards experience={currentQuest.rewards.experience} />
      )}
    </motion.div>
  )
}

export default QuestPanel