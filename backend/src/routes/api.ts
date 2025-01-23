import { Router, Request, Response } from 'express'
import { fetchAgent, fetchAgentContracts } from '../services/agent'
import {
  fetchShips,
  fetchAvailableShips,
  purchaseShip,
} from '../services/ships'
import { fetchFactions } from '../services/factions'

const router = Router()

router.get('/agent', async (req: Request, res: Response) => {
  console.log('Fetching agent')
  try {
    const agent = await fetchAgent()
    console.log('Agent fetched', agent)
    res.json(agent)
  } catch (error: any) {
    console.log('Error fetching agent', error)
    res.status(500).json({ error: error.message })
  }
})

router.get('/agentContracts', async (req: Request, res: Response) => {
  console.log('Fetching agent contracts')
  try {
    const agentContracts = await fetchAgentContracts()
    console.log('Agent contracts fetched', agentContracts)
    res.json(agentContracts)
  } catch (error: any) {
    console.log('Error fetching agent contracts', error)
    res.status(500).json({ error: error.message })
  }
})

router.get('/ships', async (req: Request, res: Response) => {
  console.log('Fetching ships')
  try {
    const ships = await fetchShips()
    res.json(ships)
  } catch (error: any) {
    console.log('Error fetching ships', error)
    res.status(500).json({ error: error.message })
  }
})

router.get('/availableShips', async (req: Request, res: Response) => {
  console.log('Fetching available ships')
  try {
    const ships = await fetchAvailableShips()
    console.log('Available ships fetched', ships)
    res.json(ships)
  } catch (error: any) {
    console.log('Error fetching available ships', error)
    res.status(500).json({ error: error.message })
  }
})

router.post('/purchaseShip', async (req: Request, res: Response) => {
  const { shipType, waypointSymbol } = req.body
  console.log('Purchasing ship', shipType, waypointSymbol)
  try {
    const ships = await purchaseShip(shipType, waypointSymbol)
    console.log('Purchased ship', ships)
    res.json(ships)
  } catch (error: any) {
    console.log('Error purchasing ship', error)
    res.status(500).json({ error: error.message })
  }
})

router.get('/factions', async (req: Request, res: Response) => {
  console.log('Fetching factions')
  try {
    const factions = await fetchFactions()
    console.log('Factions fetched', factions)
    res.json(factions)
  } catch (error: any) {
    console.log('Error fetching factions', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
