import { useShips, useAvailableShips } from './useShips'

export const useFleetData = () => {
  const ships = useShips()
  const availableShips = useAvailableShips()

  const isLoading =
    ships.isShipsLoading || availableShips.isAvailableShipsLoading

  const hasError = ships.shipsError || availableShips.availableShipsError

  return {
    ...ships,
    ...availableShips,
    isLoading,
    hasError,
  }
}
