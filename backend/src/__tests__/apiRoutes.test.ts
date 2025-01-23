import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import express from 'express'
import router from '../routes/api'
import * as agentServices from '../services/agent'
import * as shipServices from '../services/ships'
import * as factionServices from '../services/factions'

// Mock the services to control their behavior in tests
vi.mock('../services/agent')
vi.mock('../services/ships')
vi.mock('../services/factions')

describe('API Routes', () => {
  let app: express.Application

  beforeEach(() => {
    app = express()
    app.use(express.json())
    app.use('/api', router)
  })

  describe('GET /agent', () => {
    test('should return agent data successfully', async () => {
      const mockAgentData = {
        symbol: 'AGENT_SYMBOL',
        headquarters: 'SYSTEM-WAYPOINT',
      }
      vi.mocked(agentServices.fetchAgent).mockResolvedValue(mockAgentData)

      const response = await request(app).get('/api/agent')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAgentData)
      expect(agentServices.fetchAgent).toHaveBeenCalledOnce()
    })

    test('should handle errors when fetching agent data', async () => {
      vi.mocked(agentServices.fetchAgent).mockRejectedValue(
        new Error('Fetch failed')
      )

      const response = await request(app).get('/api/agent')

      expect(response.status).toBe(500)
      expect(response.body.error).toBe('Fetch failed')
    })
  })

  describe('GET /agentContracts', () => {
    test('should return agent contracts data successfully', async () => {
      const mockAgentContractsData = [{ id: 'CONTRACT1' }]
      vi.mocked(agentServices.fetchAgentContracts).mockResolvedValue(
        mockAgentContractsData
      )

      const response = await request(app).get('/api/agentContracts')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAgentContractsData)
      expect(agentServices.fetchAgentContracts).toHaveBeenCalledOnce()
    })

    test('should handle errors when fetching agent contracts data', async () => {
      vi.mocked(agentServices.fetchAgentContracts).mockRejectedValue(
        new Error('Fetch failed')
      )

      const response = await request(app).get('/api/agentContracts')

      expect(response.status).toBe(500)
      expect(response.body.error).toBe('Fetch failed')
    })
  })

  describe('GET /ships', () => {
    test('should return ships data successfully', async () => {
      const mockShipsData = [{ symbol: 'SHIP1', type: 'PROBE' }]
      vi.mocked(shipServices.fetchShips).mockResolvedValue(mockShipsData)

      const response = await request(app).get('/api/ships')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockShipsData)
      expect(shipServices.fetchShips).toHaveBeenCalledOnce()
    })
  })

  describe('GET /availableShips', () => {
    test('should return available ships data successfully', async () => {
      const mockAvailableShipsData = [{ symbol: 'SHIP2', type: 'FIGHTER' }]
      vi.mocked(shipServices.fetchAvailableShips).mockResolvedValue(
        mockAvailableShipsData
      )

      const response = await request(app).get('/api/availableShips')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAvailableShipsData)
      expect(shipServices.fetchAvailableShips).toHaveBeenCalledOnce()
    })
  })

  describe('POST /purchaseShip', () => {
    test('should purchase ship successfully', async () => {
      const mockPurchaseShipData = { id: 'SHIP_PURCHASED' }
      vi.mocked(shipServices.purchaseShip).mockResolvedValue(
        mockPurchaseShipData
      )

      const response = await request(app)
        .post('/api/purchaseShip')
        .send({ shipType: 'FREIGHTER', waypointSymbol: 'WAYPOINT1' })

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockPurchaseShipData)
    })
  })

  describe('GET /factions', () => {
    test('should return factions data successfully', async () => {
      const mockFactionsData = [
        { symbol: 'FACTION1', name: 'Galactic Alliance' },
      ]
      vi.mocked(factionServices.fetchFactions).mockResolvedValue(
        mockFactionsData
      )

      const response = await request(app).get('/api/factions')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockFactionsData)
      expect(factionServices.fetchFactions).toHaveBeenCalledOnce()
    })
  })
})
