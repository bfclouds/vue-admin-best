import BAxios from './axios'
import { CreateAxiosOptions } from './axiosTransform'
import { deepMerge } from '@/utils'
import { ContentTypeEnum } from '@/enums/httpEnum'

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new BAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        withToken: true,
      },
      opt || {}
    )
  )
}

export const defHttp = createAxios()
