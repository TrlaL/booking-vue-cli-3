import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function getCurrentActivities (data) {
  return instance.put('/bookings/current', data)
}

export function getPastActivities (data) {
  return instance.put('/bookings/past', data)
}