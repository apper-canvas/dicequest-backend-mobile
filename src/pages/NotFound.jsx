import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-fantasy-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="parchment-texture rounded-2xl p-12 shadow-magical border-2 border-secondary-DEFAULT/30">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ApperIcon name="MapPin" className="w-24 h-24 text-accent mx-auto mb-6" />
          </motion.div>
          
          <h1 className="font-fantasy text-6xl font-bold text-primary-dark mb-4">404</h1>
          <h2 className="font-fantasy text-2xl text-primary-DEFAULT mb-6">
            Quest Location Not Found
          </h2>
          <p className="font-serif text-primary-DEFAULT mb-8 max-w-md">
            The path you seek has been lost to the mists of time. Perhaps the ancient maps were wrong, 
            or maybe this location exists only in legend.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-secondary-DEFAULT text-primary-dark px-6 py-3 rounded-lg font-medium hover:bg-secondary-light transition-all duration-300 shadow-magical hover:shadow-lg transform hover:scale-105"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span>Return to Village</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound