import axios from 'axios'
import { config } from '../config/env'
import { BASE_URL, API_VERSION } from '../utils/constants'

const baseURL = `${BASE_URL}/${API_VERSION}`

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${config.SPACETRADERS_API_KEY}`,
    'Content-Type': 'application/json',
  },
})
