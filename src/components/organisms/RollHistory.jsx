import React from 'react'
import { motion } from 'framer-motion'
import Text from '../atoms/Text'

const RollHistory = ({ history }) => {
  if (history.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30"
    >
      <Text type="h3" className="text-lg">Recent Rolls</Text>
      <div className="space-y-2">
        {history.map((roll, index) => (
          <motion.div
            key={roll.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center p-3 bg-white/20 rounded-lg"
          >
            <Text type="span">
              {roll.diceType}: {roll.result} + {roll.modifier}
            </Text>
            <Text type="span" className="font-bold">{roll.total}</Text>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default RollHistory