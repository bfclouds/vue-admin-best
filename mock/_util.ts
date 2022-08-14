import { ResultEnum } from '../src/enums/httpEnum'

export function resultSuccess<T = Recordable>(
  result: T,
  { message = 'ok' } = {}
) {
  return {
    code: ResultEnum.SUCCESS,
    result,
    message,
    type: 'success',
  }
}
