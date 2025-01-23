import { fetchAgent } from './agent'
import { fetchWithCache } from '../utils/fetchAndCacheData'
import { apiClient } from './client'
import { SHIPS_KEY as KEY } from '../utils/constants'

export async function fetchShips(forceRefresh: boolean = false) {
  const path = `/my/${KEY}`
  try {
    return await fetchWithCache(
      KEY,
      async () => {
        const response = await apiClient.get(path)
        return response.data
      },
      forceRefresh
    )
  } catch (error) {
    console.error(`Error fetching ships:`, error)
    throw new Error('Failed to fetch ships')
  }
}

export async function fetchAvailableShips(forceRefresh: boolean = false) {
  try {
    const ships = await fetchShips()

    const systemSymbol = ships.data[1].nav.systemSymbol
    const waypointSymbol = ships.data[1].nav.waypointSymbol
    const path = `/systems/${systemSymbol}/waypoints/${waypointSymbol}/shipyard`

    return await fetchWithCache(
      '/availableShips',
      async () => {
        const response = await apiClient.get(path)
        return response.data
      },
      forceRefresh
    )
  } catch (error) {
    console.error(`Error fetching available ships:`, error)
    throw new Error('Failed to fetch available ships')
  }
}

export async function purchaseShip(shipType: string, waypointSymbol: string) {
  console.log(shipType, waypointSymbol)
  const path = `/my/${KEY}`
  try {
    const response = await apiClient.post(path, {
      shipType,
      waypointSymbol,
    })
    // invalidate the cache after purchase
    await fetchShips(true)
    await fetchAvailableShips(true)
    await fetchAgent(true)

    return response.data
  } catch (error) {
    console.error(`Error purchasing ship:`, error)
    throw new Error('Failed to purchase ship')
  }
}
