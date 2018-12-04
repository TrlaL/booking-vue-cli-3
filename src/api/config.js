import axios from 'axios'

export const token = 'alpvOUtFOHRxR29kTlVDUmliSnhaeSt0aXk1TU85VWh4TlhJaUVKbkptWGxlYmMrWVd0MWNjbmJReXRYdm1VUGpvYzJjcDdiSXdsUm9WSWs1aUZWcVE9PQ=='

export const instance = axios.create({
  baseURL: 'http://dev.gobambino.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export function setAuthToken (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}