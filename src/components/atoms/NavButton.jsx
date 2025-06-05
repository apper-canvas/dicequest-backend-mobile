import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'

const NavButton = ({ item, activeTab, onClick, delay }) => (
  <motion.button
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: delay }}
    onClick={() => !item.placeholder && onClick(item.id)}
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
)

export default NavButton