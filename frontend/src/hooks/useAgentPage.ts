import { useShips } from './useShips'
import { useAgent } from './useAgent'

export const useAgentPage = () => {
  const ships = useShips()
  const agent = useAgent()

  const isLoading = ships.isShipsLoading || agent.isAgentLoading

  const hasError = ships.shipsError || agent.agentError

  return {
    ...ships,
    ...agent,
    isLoading,
    hasError,
  }
}
