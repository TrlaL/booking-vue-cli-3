import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function getFavorites (params = {}) {
  return instance.get('/favorites/list', {
    params: {
      activityTypeId: params.activityTypeId,
      ipp: params.ipp,
      page: params.page
    }
  })
}

export function setFavorite (activityId, activityDate) {
  return instance.post('/favorites/set', {
    activityId,
    activityDate
  })
}

export function unsetFavorite (activityId, activityDate) {
  return instance.delete('/favorites/unset', {
    data: {
      activityId,
      activityDate
    }
  })
}