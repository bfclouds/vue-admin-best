export function treeMap<T>(
  data: T[],
  opt: { children?: string; conversion: Fn }
): T[] {
  return data.map((item) => treeMapEach(item, opt))
}

export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn }
) {
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((item: any) =>
        treeMapEach(item, { children, conversion })
      ),
    }
  }
  return {
    ...conversionData,
  }
}
