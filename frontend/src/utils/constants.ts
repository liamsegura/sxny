const baseURL = import.meta.env.VITE_BACKEND_URL

export const BASE_URL = `${baseURL}`
export const API_ROUTE = 'api'

// cache constants
export const CACHE_EXPIRATION = 5 * 60 * 1000 // 5 minutes
export const CACHE_EXPIRATION_TEST = 2000 // 2 seconds
