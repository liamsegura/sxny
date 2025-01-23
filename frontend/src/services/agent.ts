import { apiClient } from './client'

export const fetchAgent = async () => {
  try {
    console.log('Fetching agent')
    const response = await apiClient.get('/agent')
    console.log('Fetched agent res:', response.data)
    return response.data.data
  } catch (error) {
    console.error('Error fetching agent:', error)
    throw new Error('Failed to fetch agent')
  }
}
