import React from 'react'
import { motion } from 'framer-motion'

const ExperienceBar = ({ currentExp, level }) => {
  const maxExp = level * 100
  const progress = (currentExp % 100)
  
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm font-medium text-primary-dark mb-1">
        <span>Experience</span>
        <span>{currentExp} / {maxExp}</span>
      </div>
      <div className="w-full bg-primary-light/30 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-secondary-dark to-secondary-DEFAULT h-3 rounded-full shadow-sm"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export default ExperienceBar