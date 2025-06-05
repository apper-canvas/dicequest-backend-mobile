import React from 'react'
import CharacterIcon from '../atoms/CharacterIcon'
import ExperienceBar from '../atoms/ExperienceBar'
import StatDisplay from '../atoms/StatDisplay'

const CharacterInfo = ({ character, onUpdateName }) => (
  <>
    <div className="text-center mb-6">
      <CharacterIcon level={character?.level} />
      <input
        type="text"
        value={character?.name || 'Hero'}
        onChange={(e) => onUpdateName(e.target.value)}
        className="font-fantasy text-xl font-bold text-primary-dark bg-transparent border-none text-center w-full outline-none focus:bg-white/20 rounded px-2 py-1"
        maxLength={20}
      />
    </div>

    <ExperienceBar 
      currentExp={character?.experience || 0} 
      level={character?.level || 1} 
    />

    <div className="space-y-3">
      {character?.stats && Object.entries(character.stats).map(([stat, value]) => (
        <StatDisplay key={stat} stat={stat} value={value} />
      ))}
    </div>
  </>
)

export default CharacterInfo