import ResourceTable from './ResourceTable.jsx'

export default function Leaderboard() {
  return (
    <ResourceTable
      title="Leaderboard"
      description="Celebrate the points earned by your fitness community."
      endpoint="/api/leaderboard/"
      columns={['user', 'score', 'period']}
      fetcher={fetch}
    />
  )
}
