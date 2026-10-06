import { useApiCollection } from '../api.js'

function formatValue(value, field) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map((item) => formatValue(item, field)).join(', ')
  }

  if (typeof value === 'object') {
    return value.name || value._id || value.id || JSON.stringify(value)
  }

  if (field.toLowerCase().endsWith('at')) {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString()
    }
  }

  return String(value)
}

function titleCase(value) {
  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase())
}

export default function ResourceTable({ title, description, endpoint, columns, fetcher }) {
  const { records, loading, error } = useApiCollection(endpoint, fetcher)

  return (
    <section aria-labelledby="resource-title">
      <div className="resource-heading">
        <span className="resource-eyebrow">OctoFit Tracker</span>
        <h1 className="resource-title" id="resource-title">{title}</h1>
        <p className="resource-description">{description}</p>
      </div>

      <div className="resource-card">
        {loading ? (
          <div className="resource-state" role="status">
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
            Loading {title.toLowerCase()}…
          </div>
        ) : error ? (
          <div className="alert alert-danger m-3" role="alert">
            Could not load {title.toLowerCase()}: {error}
          </div>
        ) : records.length === 0 ? (
          <div className="resource-state">No {title.toLowerCase()} to show yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table resource-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column} scope="col">{titleCase(column)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id || record.id || `${title}-${index}`}>
                    {columns.map((column) => (
                      <td key={column}>{formatValue(record[column], column)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
