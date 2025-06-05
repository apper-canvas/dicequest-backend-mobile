import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../atoms/ApperIcon'
import Text from '../atoms/Text'

const LevelUpModal = ({ show, onClose, characterLevel }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
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
            <Text type="h2" className="text-3xl">Level Up!</Text>
            <Text type="p" className="mb-6">
              Your adventures have made you stronger! You've reached level {characterLevel}!
            </Text>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-secondary-DEFAULT text-primary-dark font-bold rounded-xl shadow-magical hover:bg-secondary-light transition-colors"
            >
              Continue Adventure
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

export default LevelUpModal