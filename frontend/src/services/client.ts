import axios from 'axios'
import { BASE_URL, API_ROUTE } from '../utils/constants'

const baseURL = `${BASE_URL}/${API_ROUTE}`

console.log('Using API URL:', baseURL)

export const apiClient = axios.create({
  baseURL: `${baseURL}`,
})
