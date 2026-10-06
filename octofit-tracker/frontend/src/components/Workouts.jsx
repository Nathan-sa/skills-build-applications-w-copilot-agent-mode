import ResourceTable from './ResourceTable.jsx'

export default function Workouts() {
  return (
    <ResourceTable
      title="Workouts"
      description="Choose a session that fits your goals and your day."
      endpoint="/api/workouts/"
      columns={['name', 'difficulty', 'durationMinutes', 'description']}
      fetcher={fetch}
    />
  )
}
