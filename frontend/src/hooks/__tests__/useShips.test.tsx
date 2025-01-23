/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi, describe, test, expect } from 'vitest'
import { useShips, useAvailableShips, usePurchaseShip } from '../useShips'
import * as shipsService from '../../services/ships'
import { Ship, AvailableShips } from '../../types'

// Mock the ships service
vi.mock('../../services/ships', () => ({
  fetchShips: vi.fn(),
  fetchAvailableShips: vi.fn(),
  purchaseShip: vi.fn(),
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

describe('Ship Hooks', () => {
  describe('useShips', () => {
    test('should return ships successfully', async () => {
      const mockShips: Ship[] = [
        {
          symbol: 'SHIP1',
          cargo: {
            capacity: 100,
            inventory: [],
            units: 0,
          },
          crew: {
            capacity: 100,
            current: 0,
            morale: 100,
            required: 0,
            rotation: '1',
            wages: 0,
          },
          registration: {
            role: 'ROLE1',
            waypoint: 'WAYPOINT1',
          },
          nav: {
            systemSymbol: 'X1-TEST',
            waypointSymbol: 'WAYPOINT1',
          },
          fuel: {
            capacity: 100,
            consumed: {
              amount: 0,
              timestamp: '2021-01-01T00:00:00Z',
            },
            current: 100,
          },
          frame: {
            symbol: 'FRAME1',
            name: 'FRAME1',
            description: 'FRAME1',
            moduleSlots: 1,
            mountingPoints: 1,
            fuelCapacity: 100,
            quality: 100,
            requirements: {
              power: 100,
              crew: 100,
            },
            condition: 100,
            integrity: 100,
          },
        },
      ]

      const fetchShipsMock = vi.mocked(shipsService.fetchShips)
      fetchShipsMock.mockResolvedValueOnce(mockShips)

      const { result } = await act(async () =>
        renderHook(() => useShips(), { wrapper })
      )

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(result.current.isShipsLoading).toBe(false)
      expect(result.current.ships).toEqual(mockShips)
      expect(result.current.systemSymbol).toBe('X1-TEST')
      expect(result.current.waypointSymbol).toBe('WAYPOINT1')
      expect(result.current.shipsError).toBeNull()
    })

    test('should handle error when fetchShips rejects', async () => {
      const mockError = new Error('Failed to fetch ships')

      const fetchShipsMock = vi.mocked(shipsService.fetchShips)
      fetchShipsMock.mockRejectedValueOnce(mockError)

      const { result } = await act(async () =>
        renderHook(() => useShips(), { wrapper })
      )

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(result.current.isShipsLoading).toBe(false)
      // Error will be set
      expect(result.current.shipsError).toEqual(mockError)
    })
  })

  describe('useAvailableShips', () => {
    test('should return available ships successfully', async () => {
      const mockAvailableShips: AvailableShips = {
        symbol: 'MARKET1',
        ships: [
          {
            type: 'SHIP1',
            symbol: 'SHIP1',
            name: 'SHIP1',
            description: 'SHIP1',
            supply: 'SUPPLY1',
            activity: 'ACTIVITY1',
            purchasePrice: 1000,
            frame: {
              symbol: 'FRAME1',
              name: 'FRAME1',
              description: 'FRAME1',
              moduleSlots: 1,
              mountingPoints: 1,
              fuelCapacity: 100,
              quality: 100,
              requirements: {
                power: 100,
                crew: 100,
              },
              condition: 100,
              integrity: 100,
            },
            reactor: {
              symbol: 'REACTOR1',
              name: 'REACTOR1',
              description: 'REACTOR1',
              powerOutput: 100,
              quality: 100,
              requirements: {
                crew: 100,
              },
              condition: 100,
              integrity: 100,
            },
            engine: {
              symbol: 'ENGINE1',
              name: 'ENGINE1',
              description: 'ENGINE1',
              speed: 100,
              quality: 100,
              requirements: {
                power: 100,
                crew: 100,
              },
              condition: 100,
              integrity: 100,
            },
            modules: [
              {
                symbol: 'MODULE1',
                name: 'MODULE1',
                description: 'MODULE1',
                requirements: {
                  power: 100,
                  crew: 100,
                  slots: 1,
                },
              },
            ],
            mounts: [],
            crew: {
              required: 100,
              capacity: 100,
            },
          },
        ],
        transactions: [],
        modificationFee: 1000,
        shipTypes: [],
      }

      const fetchAvailableShipsMock = vi.mocked(
        shipsService.fetchAvailableShips
      )
      fetchAvailableShipsMock.mockResolvedValueOnce(mockAvailableShips)

      const { result } = await act(async () =>
        renderHook(() => useAvailableShips(), { wrapper })
      )

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      expect(result.current.isAvailableShipsLoading).toBe(false)
      expect(result.current.availableShips).toEqual(mockAvailableShips.ships)
      expect(result.current.symbol).toBe('MARKET1')

      expect(result.current.availableShipsError).toBeNull()
    })

    test('should handle error when fetchAvailableShips rejects', async () => {
      const mockError = new Error('Failed to fetch available ships')

      const fetchAvailableShipsMock = vi.mocked(
        shipsService.fetchAvailableShips
      )
      fetchAvailableShipsMock.mockRejectedValueOnce(mockError)

      const { result } = await act(async () =>
        renderHook(() => useAvailableShips(), { wrapper })
      )

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0))
      })

      // With your current implementation, availableShips will be an empty array
      expect(result.current.isAvailableShipsLoading).toBe(false)

      // Error will be set
      expect(result.current.availableShipsError).toEqual(mockError)
    })
  })

  describe('usePurchaseShip', () => {
    test('should successfully purchase a ship', async () => {
      const mockPurchaseResult = {
        ship: { symbol: 'NEW-SHIP' },
        agent: { credits: 100000 },
      }

      const purchaseShipMock = vi.mocked(shipsService.purchaseShip)
      purchaseShipMock.mockResolvedValueOnce(mockPurchaseResult)

      const onSuccessMock = vi.fn()
      const onErrorMock = vi.fn()

      const { result } = await act(async () =>
        renderHook(
          () =>
            usePurchaseShip({
              onSuccess: onSuccessMock,
              onError: onErrorMock,
            }),
          { wrapper }
        )
      )

      await act(async () => {
        await result.current.mutate({
          shipType: 'SHIP-TYPE',
          waypointSymbol: 'WAYPOINT',
        })
      })

      expect(purchaseShipMock).toHaveBeenCalledWith('SHIP-TYPE', 'WAYPOINT')
      expect(onSuccessMock).toHaveBeenCalled()
      expect(onErrorMock).not.toHaveBeenCalled()
    })

    test('should handle error when purchasing a ship fails', async () => {
      const mockError = new Error('Failed to purchase ship')

      const purchaseShipMock = vi.mocked(shipsService.purchaseShip)
      purchaseShipMock.mockRejectedValueOnce(mockError)

      const onSuccessMock = vi.fn()
      const onErrorMock = vi.fn()

      const { result } = await act(async () =>
        renderHook(
          () =>
            usePurchaseShip({
              onSuccess: onSuccessMock,
              onError: onErrorMock,
            }),
          { wrapper }
        )
      )

      await act(async () => {
        try {
          await result.current.mutate({
            shipType: 'SHIP-TYPE',
            waypointSymbol: 'WAYPOINT',
          })
        } catch (error) {
          // Expect the error to be thrown
          expect(error).toEqual(mockError)
        }
      })

      expect(purchaseShipMock).toHaveBeenCalledWith('SHIP-TYPE', 'WAYPOINT')
      expect(onSuccessMock).not.toHaveBeenCalled()
    })
  })
})
