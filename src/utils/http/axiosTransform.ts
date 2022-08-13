import { RequestOptions } from '@/style/axios'
import { AxiosRequestConfig } from 'axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions: RequestOptions
}
