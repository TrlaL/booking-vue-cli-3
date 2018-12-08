import { instance, token, setAuthToken } from './config'

setAuthToken(token)

export function createBooking (data = {}) {
  return instance.post('/booking/create', {
    activityId: data.activityId,
    activityDate: data.activityDate,
    adultsCount: data.adultsCount,
    childsCount: data.childsCount,
    familyMembers: data.familyMembers,
    paymentNonce: data.paymentNonce,
    useMoney: data.useMoney,
    withOwner: data.withOwner
  })
}

export function calculateDraft (data = {}) {
  return instance.post('/bookings/calculate-draft', {
    activityId: data.activityId,
    activityDate: data.activityDate,
    adultsCount: data.adultsCount,
    childsCount: data.childsCount,
    familyMembers: data.familyMembers,
    paymentNonce: data.paymentNonce,
    useMoney: data.useMoney,
    withOwner: data.withOwner
  })
}

export function getCurrentActivities (data = {}) {
  return instance.put('/bookings/current', {
    filters: data.filters,
    pages: data.pages,
    sorting: data.sorting
  })
}

export function getPastActivities (data = {}) {
  return instance.put('/bookings/past', {
    filters: data.filters,
    pages: data.pages,
    sorting: data.sorting
  })
}