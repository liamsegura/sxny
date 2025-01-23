import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchWithCache } from '../utils/fetchAndCacheData'
import CacheData from '../models/cacheData'

// Define the type for CacheData mock
type MockedCacheData = {
  findOne: ReturnType<typeof vi.fn>
  create: ReturnType<typeof vi.fn>
}

// Mock the `CacheData` model
vi.mock('../models/cacheData', () => ({
  default: {
    findOne: vi.fn(),
    create: vi.fn(),
  },
}))

// Cast the mock to the correct type
const MockCacheData = CacheData as unknown as MockedCacheData

describe('fetchWithCache', () => {
  const mockKey = 'test-key'
  const mockData = { message: 'mock data' }
  const mockApiCall = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('returns cached data if valid cache entry exists', async () => {
    const mockCacheEntry = {
      data: mockData,
      updatedAt: new Date(Date.now() - 100), // Valid cache
      save: vi.fn(),
    }

    MockCacheData.findOne.mockResolvedValue(mockCacheEntry)

    const result = await fetchWithCache(mockKey, mockApiCall)

    expect(result).toEqual(mockData)
    expect(MockCacheData.findOne).toHaveBeenCalledWith({ key: mockKey })
    expect(mockApiCall).not.toHaveBeenCalled()
    expect(mockCacheEntry.save).not.toHaveBeenCalled()
  })

  test('fetches new data and updates cache if no valid cache exists', async () => {
    MockCacheData.findOne.mockResolvedValue(null)
    mockApiCall.mockResolvedValue(mockData)

    const result = await fetchWithCache(mockKey, mockApiCall)

    expect(result).toEqual(mockData)
    expect(MockCacheData.findOne).toHaveBeenCalledWith({ key: mockKey })
    expect(mockApiCall).toHaveBeenCalled()
    expect(MockCacheData.create).toHaveBeenCalledWith({
      key: mockKey,
      data: mockData,
    })
  })
})
// TODO test to check if cache is updated if cache is expired and new data is fetched
