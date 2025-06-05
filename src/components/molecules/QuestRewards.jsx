import React from 'react'
import ApperIcon from '../atoms/ApperIcon'
import Text from '../atoms/Text'

const QuestRewards = ({ experience }) => (
  <div className="bg-secondary-DEFAULT/20 rounded-lg p-4">
    <Text type="h4">Rewards:</Text>
    <div className="flex items-center space-x-2">
      <ApperIcon name="Star" className="w-4 h-4 text-secondary-dark" />
      <Text type="span">{experience || 50} XP</Text>
    </div>
  </div>
)

export default QuestRewards