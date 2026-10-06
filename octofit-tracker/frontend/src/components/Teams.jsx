import ResourceTable from './ResourceTable.jsx'

export default function Teams() {
  return (
    <ResourceTable
      title="Teams"
      description="Find your crew and see who is moving together."
      endpoint="/api/teams/"
      columns={['name', 'description', 'members']}
      fetcher={fetch}
    />
  )
}
