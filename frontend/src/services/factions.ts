import { apiClient } from './client'

export const fetchFactions = async () => {
  try {
    console.log('Fetching factions')
    const response = await apiClient.get('/factions')
    console.log('Fetched factions res:', response)
    return response.data
  } catch (error) {
    console.error('Error fetching factions:', error)
    throw new Error('Failed to fetch factions')
  }
}
