import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import NavButton from '../atoms/NavButton'
import Text from '../atoms/Text'
const GameHeader = ({ activeTab, setActiveTab, navItems }) => (
  <header className="relative z-10 bg-gradient-to-r from-primary-dark/90 to-primary-DEFAULT/90 backdrop-blur-sm border-b-2 border-secondary-DEFAULT/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-3"
        >
          <ApperIcon name="Sword" className="w-8 h-8 text-secondary-DEFAULT animate-glow" />
          <Text type="h1">DiceQuest</Text>
        </motion.div>

        <nav className="hidden md:flex space-x-1">
          {navItems.map((item, index) => (
            <NavButton
              key={item.id}
              item={item}
              activeTab={activeTab}
              onClick={setActiveTab}
              delay={index * 0.1}
            />
          ))}
        </nav>

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
)

export default GameHeader