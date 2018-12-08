import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function getFavorites (data = {}) {
  data.filters = data.filters || {}
  data.pages = data.pages || {}
  return instance.get('/favorites/list', {
    params: {
      activityTypeId: data.filters.activityTypeId,
      ipp: data.pages.ipp,
      page: data.pages.page
    }
  })
}

export function setFavorite (activityId, activityDate = null) {
  return instance.post('/favorites/set', { activityId, activityDate })
}

export function unsetFavorite (activityId, activityDate = null) {
  return instance.delete('/favorites/unset', {
    data: { activityId, activityDate }
  })
}