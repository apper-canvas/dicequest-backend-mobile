import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Text from '../atoms/Text'

const RollResultDisplay = ({ rollResult, currentQuest, onApplyToQuest }) => (
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
            onClick={onApplyToQuest}
            className="mt-4 px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Apply to Quest
          </motion.button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
)

export default RollResultDisplay