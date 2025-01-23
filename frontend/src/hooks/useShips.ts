import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchShips,
  fetchAvailableShips,
  purchaseShip,
} from '../services/ships'

import { Ship, AvailableShips, PurchaseShipOptions } from '../types'

export const useShips = () => {
  const {
    data: shipsData,
    isLoading: isShipsLoading,
    error: shipsError,
  } = useQuery<Ship[]>({ queryKey: ['ships'], queryFn: fetchShips })

  const ships = shipsData ?? []
  const systemSymbol = ships[0]?.nav.systemSymbol ?? ''
  const waypointSymbol = ships[0]?.nav.waypointSymbol ?? ''

  return {
    ships,
    systemSymbol,
    waypointSymbol,
    isShipsLoading,
    shipsError,
  }
}

export const useAvailableShips = () => {
  const {
    data: availableShipsData,
    isLoading: isAvailableShipsLoading,
    error: availableShipsError,
  } = useQuery<AvailableShips>({
    queryKey: ['availableShips'],
    queryFn: fetchAvailableShips,
  })

  const availableShips = availableShipsData?.ships ?? []
  const transactions = availableShipsData?.transactions ?? []
  const symbol = availableShipsData?.symbol ?? ''

  return {
    availableShips,
    transactions,
    symbol,
    isAvailableShipsLoading,
    availableShipsError,
  }
}

export const usePurchaseShip = (options?: PurchaseShipOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (purchaseData: {
      shipType: string
      waypointSymbol: string
    }) => {
      const { shipType, waypointSymbol } = purchaseData
      return purchaseShip(shipType, waypointSymbol)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availableShips'] })
      queryClient.invalidateQueries({ queryKey: ['agent'] })
      options?.onSuccess()
    },
    onError: () => {
      options?.onError()
      queryClient.setQueryData(['availableShips'], {
        ships: [],
        transactions: [],
        symbol: '',
      })
    },
  })
}
