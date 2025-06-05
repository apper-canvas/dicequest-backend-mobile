import React from 'react'
import { motion } from 'framer-motion'
import CharacterInfo from '../molecules/CharacterInfo'

const CharacterPanel = ({ character, onCharacterUpdate }) => {
  const updateCharacterName = async (newName) => {
    if (newName.trim() && character) {
      const updatedCharacter = { ...character, name: newName.trim() }
      onCharacterUpdate(updatedCharacter)
    }
  }

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="parchment-texture rounded-2xl p-6 shadow-magical border-2 border-secondary-DEFAULT/30"
    >
      <CharacterInfo 
        character={character} 
        onUpdateName={updateCharacterName} 
      />
    </motion.div>
  )
}

export default CharacterPanel