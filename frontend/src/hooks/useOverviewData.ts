import { useShips, useAvailableShips } from './useShips'
import { useFactions } from './useFactions'

export const useOverviewData = () => {
  const ships = useShips()
  const availableShips = useAvailableShips()
  const factions = useFactions()

  const isLoading =
    ships.isShipsLoading ||
    availableShips.isAvailableShipsLoading ||
    factions.isFactionsLoading

  const hasError =
    ships.shipsError ||
    availableShips.availableShipsError ||
    factions.factionsError

  return {
    ...ships,
    ...availableShips,
    ...factions,
    isLoading,
    hasError,
  }
}
