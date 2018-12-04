import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function getCards () {
  return instance.get('/cards/index')
}

export function createCard (data) {
  return instance.post('/cards/create', data)
}

export function updateCard (id, data) {
  return instance.put(`/cards/update?id=${id}`, data)
}

export function deleteCard (id) {
  return instance.delete(`/cards/delete?id=${id}`)
}