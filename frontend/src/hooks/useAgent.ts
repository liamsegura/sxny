import { useQuery } from '@tanstack/react-query'

import { fetchAgent } from '../services/agent'

export const useAgent = () => {
  const {
    data: agentData,
    isLoading: isAgentLoading,
    error: agentError,
  } = useQuery({ queryKey: ['agent'], queryFn: fetchAgent })

  return {
    agentData,
    isAgentLoading,
    agentError,
  }
}
