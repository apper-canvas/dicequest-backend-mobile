import React from 'react'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'

const QuestRequirement = ({ skillCheck }) => (
  <div className="bg-primary-light/20 rounded-lg p-4 mb-4">
    <Text type="h4">Required Roll:</Text>
    <div className="flex items-center space-x-2">
      <ApperIcon name="Target" className="w-4 h-4 text-accent" />
      <Text type="span" className="font-bold">
        {skillCheck || 10}+
      </Text>
    </div>
  </div>
)

export default QuestRequirement