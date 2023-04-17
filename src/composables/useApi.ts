import axios, { type RawAxiosRequestHeaders, type AxiosInstance } from 'axios'

let api: AxiosInstance

function createApi(): AxiosInstance {
  api = axios.create({})

  return api
}

export function useApi(): AxiosInstance {
  if (!api) {
    createApi()
  }
  return api
}
