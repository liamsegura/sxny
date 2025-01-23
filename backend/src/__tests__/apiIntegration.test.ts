import { describe, it, expect } from 'vitest'
import { apiClient } from '../services/client'
import { config } from '../config/env'

describe('SpaceTraders API Integration', () => {
  beforeAll(() => {
    apiClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${config.SPACETRADERS_API_KEY}`
  })

  test('should fetch agent data successfully', async () => {
    const response = await apiClient.get('/my/agent')
    expect(response.status).toBe(200)
    expect(response.data).toBeDefined()
    expect(response.data.data).toHaveProperty('symbol')
    expect(response.data.data).toHaveProperty('headquarters')
  })

  test('should fetch agent contracts', async () => {
    const response = await apiClient.get('/my/contracts')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.data.data)).toBe(true)
  })

  test('should fetch ships', async () => {
    const response = await apiClient.get('/my/ships')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.data.data)).toBe(true)
  })

  test('should fetch available ships', async () => {
    const response = await apiClient.get(
      '/systems/X1-NJ56/waypoints/X1-NJ56-H49/shipyard'
    )
    console.log('fetchAvailableShips test response:', response.data)
    expect(response.status).toBe(200)
    expect(response.data).toBeDefined()
    expect(typeof response.data).toBe('object')
  })

  test('should fetch factions', async () => {
    const response = await apiClient.get('/factions')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.data.data)).toBe(true)
  })
})
