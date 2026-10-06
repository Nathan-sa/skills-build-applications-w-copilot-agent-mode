import ResourceTable from './ResourceTable.jsx'

export default function Activities() {
  return (
    <ResourceTable
      title="Activities"
      description="Track the movement and milestones that add up to progress."
      endpoint="/api/activities/"
      columns={['type', 'durationMinutes', 'points', 'completedAt', 'user']}
      fetcher={fetch}
    />
  )
}
