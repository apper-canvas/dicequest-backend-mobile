import diceRollData from '../mockData/diceRoll.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let diceRolls = [...diceRollData]

const diceRollService = {
  async getAll() {
    await delay(200)
    return [...diceRolls]
  },

  async getById(id) {
    await delay(150)
    const roll = diceRolls.find(r => r.id === id)
    return roll ? { ...roll } : null
  },

  async create(rollInfo) {
    await delay(250)
    const newRoll = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...rollInfo
    }
    diceRolls.unshift(newRoll)
    
    // Keep only last 100 rolls
    if (diceRolls.length > 100) {
      diceRolls = diceRolls.slice(0, 100)
    }
    
    return { ...newRoll }
  },

  async update(id, data) {
    await delay(300)
    const index = diceRolls.findIndex(r => r.id === id)
    if (index === -1) throw new Error("Dice roll not found")
    
    diceRolls[index] = { ...diceRolls[index], ...data }
    return { ...diceRolls[index] }
  },

  async delete(id) {
    await delay(200)
    const index = diceRolls.findIndex(r => r.id === id)
    if (index === -1) throw new Error("Dice roll not found")
    
    diceRolls.splice(index, 1)
    return { success: true }
  }
}

export default diceRollService