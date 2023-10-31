export async function fetchDataOrThrowError(api: string, requestOptions = {}): Promise<any> {
    const response = await fetch(api, requestOptions).then((response) => {
      if (response.status === 401) {
        throw new Error("unauthorized")
      }
      return response
    })
    const results = await response.json()
    if (!response.ok) throw new Error(results.error)
    return results.res
}