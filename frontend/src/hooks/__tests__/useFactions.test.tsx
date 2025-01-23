/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, test, expect } from 'vitest'
import { useFactions } from '../useFactions'
import * as factionsService from '../../services/factions'

vi.mock('../../services/factions', () => ({
  fetchFactions: vi.fn(),
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

describe('useFactions', () => {
  test('should return an error when fetchFactions rejects', async () => {
    const mockError = new Error('Failed to fetch factions')

    // Create the mock before rendering the hook
    const fetchFactionsMock = vi.mocked(factionsService.fetchFactions)
    fetchFactionsMock.mockRejectedValueOnce(mockError)

    // Use act to wrap the hook rendering
    const { result } = await act(async () =>
      renderHook(() => useFactions(), { wrapper })
    )

    // Check initial loading state
    expect(
      result.current.isFactionsLoading,
      'Initial loading state should be true'
    ).toBe(true)

    // Wait for the query to settle
    await act(async () => {
      // This gives time for the async query to complete
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(
      result.current.isFactionsLoading,
      'Loading state should be false after query'
    ).toBe(false)
    expect(result.current.factionsError).toEqual(mockError)
  })
})
