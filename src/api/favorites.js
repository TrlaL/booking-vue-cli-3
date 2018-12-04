import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function getFavorites (params = {}) {
  return instance.get('/favorites/list', { params })
}

export function setFavorite (activityId, activityDate) {
  return instance.post('/favorites/set', { activityId, activityDate })
}

export function unsetFavorite (activityId, activityDate) {
  return instance.delete('/favorites/unset', {
    data: {
      activityId,
      activityDate
    }
  })
}