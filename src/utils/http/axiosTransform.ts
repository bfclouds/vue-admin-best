import { RequestOptions } from '@/style/axios'
import { AxiosRequestConfig } from 'axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  requestOptions?: RequestOptions
  transform?: AxiosTransform
}

export abstract class AxiosTransform {
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig
}
