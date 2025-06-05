import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'

const PlaceholderSection = ({ title, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center h-96 text-center"
  >
    <div className="parchment-texture rounded-2xl p-8 shadow-magical border-2 border-secondary-DEFAULT/30">
      <ApperIcon name={icon} className="w-16 h-16 text-secondary-DEFAULT mb-4 mx-auto animate-bounce-slow" />
      <h2 className="font-fantasy text-2xl text-primary-dark mb-4">{title}</h2>
      <p className="font-serif text-primary-DEFAULT">{description}</p>
    </div>
  </motion.div>
)

export default PlaceholderSection