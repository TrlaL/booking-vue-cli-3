import { instance } from './config'

export function getRegions () {
  return instance.get('/helpers/regions')
}

export function getCities (id) {
  return instance.get(`/helpers/cities?id=${id}`)
}

export function getDistricts (id) {
  return instance.get(`/helpers/districts?id=${id}`)
}