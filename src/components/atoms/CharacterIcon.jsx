import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'

const CharacterIcon = ({ level }) => (
  <div className="relative inline-block">
    <div className="w-20 h-20 bg-gradient-to-br from-primary-light to-primary-dark rounded-full flex items-center justify-center mb-3 shadow-dice">
      <ApperIcon name="User" className="w-10 h-10 text-secondary-DEFAULT" />
    </div>
    <div className="absolute -top-2 -right-2 bg-secondary-DEFAULT text-primary-dark text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
      {level || 1}
    </div>
  </div>
)

export default CharacterIcon