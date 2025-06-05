import questData from '../mockData/quest.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let quests = [...questData]

const questService = {
  async getAll() {
    await delay(250)
    return [...quests]
  },

  async getById(id) {
    await delay(200)
    const quest = quests.find(q => q.id === id)
    return quest ? { ...quest } : null
  },

  async create(questInfo) {
    await delay(400)
    const newQuest = {
      id: Date.now().toString(),
      ...questInfo,
      createdAt: new Date().toISOString()
    }
    quests.push(newQuest)
    return { ...newQuest }
  },

  async update(id, data) {
    await delay(300)
    const index = quests.findIndex(q => q.id === id)
    if (index === -1) throw new Error("Quest not found")
    
    quests[index] = { ...quests[index], ...data, updatedAt: new Date().toISOString() }
    return { ...quests[index] }
  },

  async delete(id) {
    await delay(200)
    const index = quests.findIndex(q => q.id === id)
    if (index === -1) throw new Error("Quest not found")
    
    quests.splice(index, 1)
    return { success: true }
  }
}

export default questService