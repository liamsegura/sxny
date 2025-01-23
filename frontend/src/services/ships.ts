import { apiClient } from './client'

export const fetchShips = async () => {
  try {
    console.log('Fetching ships')
    const response = await apiClient.get('/ships')
    console.log('Fetched ship res:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('Error fetching ships:', error)
    throw new Error('Failed to fetch ships')
  }
}

export const fetchAvailableShips = async () => {
  try {
    console.log('Fetching available ships')
    const response = await apiClient.get(`/availableShips`)
    console.log('Fetched available ships res:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('Error fetching available ships:', error)
    throw new Error('Failed to fetch available ships')
  }
}

export const purchaseShip = async (
  shipType: string,
  waypointSymbol: string
) => {
  try {
    console.log('Purchasing ship:', shipType, waypointSymbol)
    const response = await apiClient.post('/purchaseShip', {
      shipType,
      waypointSymbol,
    })
    console.log('Purchased ship res:', response.data.data)
    return response.data.data
  } catch (error) {
    console.error('Error purchasing ship:', error)
    throw new Error('Failed to purchase ship')
  }
}
