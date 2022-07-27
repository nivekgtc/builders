export class QueryHelper {
  public static ParamsToQuery = (url: string, params?): string => {
    if (!params) return url
    const result = Object.entries(params).reduce(
      (prev, curr) => prev.concat(curr[0], "=", encodeURIComponent(curr[1].toString())),
      "?",
    )
    return url.concat(result)
  }
}
