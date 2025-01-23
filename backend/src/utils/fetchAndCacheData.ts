import CacheData from '../models/cacheData'
import { CACHE_EXPIRATION } from './constants'

// if forceRefresh is true, the cache is ignored and new data is fetched.
// caches API responses in MongoDB and returns cached data if valid.
// unique key for the cached data ('ships', 'agent').
// apiCall is a function that performs the API request (returns a promise).

export async function fetchWithCache<T>(
  key: string,
  apiCall: () => Promise<T>,
  forceRefresh: boolean = false
): Promise<T> {
  const now = Date.now()

  try {
    // Check if forcing a refresh or no cache exists
    if (forceRefresh) {
      console.log(`Force refreshing data for key: ${key}`)
      const newData = await apiCall()
      await CacheData.findOneAndUpdate(
        { key },
        { data: newData, updatedAt: new Date() },
        { upsert: true }
      )
      return newData
    }

    console.log(key, 'key')
    // check if the data exists in the cache
    const cacheEntry = await CacheData.findOne({ key })

    // check if cache hasn't expired
    if (cacheEntry && now - cacheEntry.updatedAt.getTime() < CACHE_EXPIRATION) {
      console.log(`Returning cached data for key: ${key}`)
      return cacheEntry.data as T
    }

    // fetch new data from the API
    console.log(`Fetching new data for key: ${key}`)
    const newData = await apiCall()

    // update the cache
    if (cacheEntry) {
      cacheEntry.data = newData as Record<string, any>
      cacheEntry.updatedAt = new Date()
      await cacheEntry.save()
    } else {
      await CacheData.create({ key, data: newData })
    }

    return newData
  } catch (error) {
    console.error(`Error fetching data for key: ${key}`, error)
    throw new Error(`Failed to fetch data for key: ${key}`)
  }
}
