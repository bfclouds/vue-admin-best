import { RequestOptions } from '@/style/axios'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { CreateAxiosOptions } from './axiosTransform'

class BAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions
  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
  }

  get(config: AxiosRequestConfig, options?: RequestOptions) {
    return this.request({
      ...config,
      method: 'GET',
      ...options,
    })
  }
  post(config: AxiosRequestConfig, options?: RequestOptions) {
    return this.request({
      ...config,
      method: 'POST',
      ...options,
    })
  }

  request(config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default BAxios
