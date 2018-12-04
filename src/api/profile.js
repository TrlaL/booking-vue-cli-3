import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function loadUserSettings () {
  return instance.get('/profile/load')
}

export function saveUserSettings (data) {
  return instance.put('/profile/save', data)
}

export function getFamilyMembers () {
  return instance.get('/profile/family-members')
}

export function saveAdult (data) {
  return instance.put('/profile/save-adult', data)
}

export function saveChild (data) {
  return instance.put('/profile/save-child', data)
}

export function deleteFamilyMember (id) {
  return instance.delete('/profile/delete-family-member', {
    data: { id }
  })
}

export function activatePromocode (code) {
  return instance.post('/promocode/activate', { code })
}