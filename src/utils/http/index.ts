import BAxios from './axios'
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { deepMerge } from '@/utils'
import { ContentTypeEnum } from '@/enums/httpEnum'
import { clone } from 'lodash-es'

const transform: AxiosTransform = {
  beforeRequestHook: (config, options) => {
    const { joinPrefix, urlPrefix } = options
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }
    return config
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new BAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        withToken: true,
        transform: clone(transform),
        requestOptions: {
          joinPrefix: true,
          urlPrefix: '/api',
        },
      } as CreateAxiosOptions,
      opt || {}
    )
  )
}

export const defHttp = createAxios()
