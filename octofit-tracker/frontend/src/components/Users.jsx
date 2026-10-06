import ResourceTable from './ResourceTable.jsx'

export default function Users() {
  return (
    <ResourceTable
      title="Users"
      description="Meet the people building healthier habits with OctoFit."
      endpoint="/api/users/"
      columns={['name', 'email', 'team']}
      fetcher={fetch}
    />
  )
}
