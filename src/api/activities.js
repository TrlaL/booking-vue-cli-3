import { instance } from './config'

export function getActivities (data = {}, query = '') {
  return instance.put(`/activities/list?query=${query}`, data)
}

export function getActivity (id) {
  return instance.get(`/activities/show?id=${id}`)
}