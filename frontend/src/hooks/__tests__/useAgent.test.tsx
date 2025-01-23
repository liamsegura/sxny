/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, test, expect } from 'vitest'
import { useAgent } from '../useAgent'
import * as agentService from '../../services/agent'

vi.mock('../../services/agent', () => ({
  fetchAgent: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryDelay: 0,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useAgent', () => {
  test('should return an error when fetchAgent rejects', async () => {
    const mockError = new Error('Failed to fetch agent')

    // Create the mock before rendering the hook
    const fetchAgentMock = vi.mocked(agentService.fetchAgent)
    fetchAgentMock.mockRejectedValueOnce(mockError)

    // Use act to wrap the hook rendering
    const { result } = await act(async () =>
      renderHook(() => useAgent(), { wrapper })
    )

    // Check initial loading state
    expect(
      result.current.isAgentLoading,
      'Initial loading state should be true'
    ).toBe(true)

    // Wait for the query to settle
    await act(async () => {
      // This gives time for the async query to complete
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(
      result.current.isAgentLoading,
      'Loading state should be false after query'
    ).toBe(false)
    expect(result.current.agentData).toBeUndefined()
    expect(result.current.agentError).toEqual(mockError)
  })
})
