import { instance } from './config'

export function getActivities (data = {}, query = '') {
  return instance.put(`/activities/list?query=${query}`, {
    filters: data.filters,
    pages: data.pages,
    sorting: data.sorting
  })
}

export function getActivity (id) {
  return instance.get(`/activities/show?id=${id}`)
}