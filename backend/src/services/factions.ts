import { fetchWithCache } from '../utils/fetchAndCacheData'
import { apiClient } from './client'
import { FACTIONS_KEY as KEY } from '../utils/constants'

export async function fetchFactions() {
  const path = `/${KEY}`
  try {
    return await fetchWithCache(KEY, async () => {
      const response = await apiClient.get(path)
      return response.data.data
    })
  } catch (error) {
    console.error(`Error fetching factions:`, error)
    throw new Error('Failed to fetch factions')
  }
}
