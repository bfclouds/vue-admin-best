export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isObject(val: unknown): val is Object {
  return typeof val === 'object' && val !== null
}
