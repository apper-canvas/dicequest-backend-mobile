import React from 'react'
import { motion } from 'framer-motion'

const DiceButton = ({ type, sides, color, isSelected, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`aspect-square rounded-xl border-2 transition-all duration-300 ${
      isSelected
        ? 'border-secondary-DEFAULT shadow-magical scale-105'
        : 'border-primary-light/50 hover:border-secondary-light'
    } bg-gradient-to-br ${color} text-white font-bold text-lg shadow-dice`}
  >
    {type.toUpperCase()}
  </motion.button>
)

export default DiceButton