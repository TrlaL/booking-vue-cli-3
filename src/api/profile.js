import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function loadUserSettings () {
  return instance.get('/profile/load')
}

export function saveUserSettings (data) {
  return instance.put('/profile/save', {
    email: data.email,
    fullName: data.fullName,
    password: data.password,
    phone: data.phone
  })
}

export function getClientToken () {
  return instance.get('/profile/client-token')
}

export function getFamilyMembers () {
  return instance.get('/profile/family-members')
}

export function saveAdult (data) {
  return instance.put('/profile/save-adult', {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    phone: data.phone
  })
}

export function saveChild (data) {
  return instance.put('/profile/save-child', {
    id: data.id,
    fullName: data.fullName,
    birthDate: data.birthDate
  })
}

export function deleteFamilyMember (id) {
  return instance.delete('/profile/delete-family-member', {
    data: { id }
  })
}

export function activatePromocode (code) {
  return instance.post('/promocode/activate', { code })
}