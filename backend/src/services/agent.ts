import { fetchWithCache } from '../utils/fetchAndCacheData'
import { apiClient } from './client'
import { AGENT_KEY, CONTRACTS_KEY } from '../utils/constants'

export async function fetchAgent(forceRefresh: boolean = false) {
  const path = `/my/${AGENT_KEY}`
  try {
    return await fetchWithCache(
      AGENT_KEY,
      async () => {
        const response = await apiClient.get(path)
        return response.data
      },
      forceRefresh
    )
  } catch (error) {
    console.error(`Error fetching agent:`, error)
    throw new Error('Failed to fetch agent')
  }
}

export async function fetchAgentContracts() {
  const path = `/my/${CONTRACTS_KEY}`
  try {
    return await fetchWithCache(CONTRACTS_KEY, async () => {
      const response = await apiClient.get(path)
      return response.data
    })
  } catch (error) {
    console.error(`Error fetching agent contracts:`, error)
    throw new Error('Failed to fetch agent contracts')
  }
}
