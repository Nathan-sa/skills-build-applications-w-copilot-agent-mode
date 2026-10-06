import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const codespaceFrontendHost =
  typeof window === 'undefined'
    ? ''
    : window.location.hostname.match(/^(.+)-5173\.app\.github\.dev$/)?.[1]

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : codespaceFrontendHost
    ? `https://${codespaceFrontendHost}-8000.app.github.dev`
    : 'http://localhost:8000'

export function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'data', 'items']) {
      const value = payload[key]
      if (Array.isArray(value)) {
        return value
      }
    }

    if (payload.data && typeof payload.data === 'object') {
      return extractRecords(payload.data)
    }
  }

  throw new Error('The API returned an unsupported collection response.')
}

export function useApiCollection(endpoint, fetcher) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        setLoading(true)
        setError('')
        const response = await fetcher(`${apiBase}${endpoint}`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
          throw new Error(`The API request failed with status ${response.status}.`)
        }

        const payload = await response.json()
        setRecords(extractRecords(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          const message =
            requestError instanceof TypeError
              ? `Unable to reach the API at ${apiBase}. Confirm the backend is running on port 8000.`
              : requestError.message || 'Unable to load data from the API.'
          setError(message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint, fetcher])

  return { records, loading, error }
}
