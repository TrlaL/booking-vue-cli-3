import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function getCards () {
  return instance.get('/cards/index')
}

export function createCard (data) {
  return instance.post('/cards/create', {
    number: data.number,
    expireDate: data.expireDate,
    cvv: data.cvv
  })
}

export function updateCard (id, data) {
  return instance.put(`/cards/update?id=${id}`, {
    number: data.number,
    expireDate: data.expireDate,
    cvv: data.cvv
  })
}

export function deleteCard (id) {
  return instance.delete(`/cards/delete?id=${id}`)
}