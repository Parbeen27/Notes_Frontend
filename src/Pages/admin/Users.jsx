import React from 'react'
import UsersTable from '../../components/admin/UsersTable'

function Users() {
  return (
    <div className='p-5 md:ml-64'>
      <h1 className='text-2xl font-bold mb-6'>Users Management</h1>
      <UsersTable/>
    </div>
  )
}

export default Users