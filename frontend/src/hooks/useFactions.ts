import { useQuery } from '@tanstack/react-query'
import { fetchFactions } from '../services/factions'

import { Faction, ApiResponse } from '../types'

export const useFactions = () => {
  const {
    data: factionsData,
    isLoading: isFactionsLoading,
    error: factionsError,
  } = useQuery<ApiResponse<Faction[]>>({
    queryKey: ['factions'],
    queryFn: fetchFactions,
  })

  const factions = factionsData?.data ?? []

  return {
    factions,
    isFactionsLoading,
    factionsError,
  }
}
