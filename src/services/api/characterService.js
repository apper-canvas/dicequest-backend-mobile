import characterData from '../mockData/character.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let characters = [...characterData]

const characterService = {
  async getAll() {
    await delay(300)
    return [...characters]
  },

  async getById(id) {
    await delay(200)
    const character = characters.find(c => c.id === id)
    return character ? { ...character } : null
  },

  async create(characterInfo) {
    await delay(400)
    const newCharacter = {
      id: Date.now().toString(),
      ...characterInfo,
      createdAt: new Date().toISOString()
    }
    characters.push(newCharacter)
    return { ...newCharacter }
  },

  async update(id, data) {
    await delay(300)
    const index = characters.findIndex(c => c.id === id)
    if (index === -1) throw new Error("Character not found")
    
    characters[index] = { ...characters[index], ...data, updatedAt: new Date().toISOString() }
    return { ...characters[index] }
  },

  async delete(id) {
    await delay(200)
    const index = characters.findIndex(c => c.id === id)
    if (index === -1) throw new Error("Character not found")
    
    characters.splice(index, 1)
    return { success: true }
  }
}

export default characterService