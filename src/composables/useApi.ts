import axios, { type RawAxiosRequestHeaders, type AxiosInstance } from 'axios'

let api: AxiosInstance

function createApi() {
  api = axios.create({})

  return api
}

export function useApi() {
  if (!api) {
    createApi()
  }
  return api
}
