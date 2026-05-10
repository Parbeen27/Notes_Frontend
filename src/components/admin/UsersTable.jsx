import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { Ban, Trash2 } from "lucide-react"
import api from '../../services/api'
export default function UsersTable() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedRoles, setSelectedRoles] = useState("")
    const token = localStorage.getItem("accessToken")

    
    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await api.get("admin/users")
            setUsers(res.data)
            
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    },[])

    const roleCount = users.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    },
    { admin: 0, analyst: 0, user: 0 }
    );
    


    // Block / Unblock
    const toggleBlock = async (id,isBlocked) => {
        try {
            await api.patch(`/admin/users/block/${id}`)

            toast.success(
                isBlocked ? "User unblocked successfully" : "User blocked Successfully"
            )
            fetchUsers()
            
            
        } catch (err) {
            console.log(err);
            toast.error("Failed to update status")
        }
    }

    // Delete
    const deleteUser = async (id) => {
        if(!window.confirm("Delete this user?")) return;

        try {
            await api.patch(`/admin/users/delete/${id}`)
            toast.success("User deleted")
            fetchUsers()
        } catch (err) {
            console.log(err);
            toast.error("Delete failed")
            
        }
    }
    const updateUserRole = async(id,newRole) => {
        try {
            await api.patch(`/admin/users/role/${id}`, {
            role: newRole
        });
            toast.success("Role updated")
            fetchUsers()
        } catch (err) {
            toast.error(err.response?.data?.message || "Server error")
        }
    }

    const updateRole = async (id,newRole) => {
        
        try {
            await updateUserRole(id,newRole)
            fetchUsers()
        } catch (err) {
            console.log(err);               
        }
    }

    //search
    const filteredUsers = users.filter((user) => 
    user.username.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className='bg-white  p-6 sm:p-6 rounded-2xl shadow w-full'>
        {/* search bar */}
        <div className='mb-4 flex flex-col sm:flex-row gap-3'>
            <input 
            type='text'
            placeholder='Search by username...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='px-4 py-2 border rounded-lg w-full sm:w-80 focus:ring-2 focus:ring-blue-500'
            />
        </div>
        <div className='flex gap-3'>
            <p>Total Users: {users.length}</p>
            <p>Admin Users: {roleCount.admin}</p>
            <p>Users: {roleCount.user}</p>
        </div>
        {/* Table */}
        <div className='hidden md:block overflow-x-auto w-full'>
            {loading? (
                <p>Loading users...</p>
            ) : (
                <table className='min-w-max w-full text-sm text-left'>
                    <thead className='bg-gray-100 '>
                        <tr>
                            <th className='p-2 sm:p-3'>Username</th>
                            <th className='p-2 sm:p-3'>Email</th>
                            <th className='p-2 sm:p-3'>Role</th>
                            <th className='p-2 sm:p-3'>Status</th>
                            <th className='p-2 sm:p-3'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className='border-t dark:border-gray-700'>
                                <td className='p-2 sm:p-3 whitespace-nowrap'>{user.username}</td>
                                <td className='p-2 sm:p-3'>{user.email}</td>

                                <td className='p-3 space-y-1'>
                                    {/* <span className='bg-blue-500 text-white px-2 py-1 rounded text-xs'>
                                        {user.role}
                                    </span> */}
                                    <span className={`px-2 py-1 rounded text-xs text-white ${
                                        user.role === "admin"
                                        ? "bg-purple-600"
                                        : user.role === "analyst"
                                        ? "bg-blue-500"
                                        : "bg-gray-500"
                                    }`}>
                                        {user.role}
                                    </span>

                                    <select 
                                    value={selectedRoles[user._id] || user.role}
                                    onChange={(e) => {
                                        setSelectedRoles({
                                            ...selectedRoles,[user._id]: e.target.value,
                                        })
                                    }}
                                    className='block mt-1 border rounded px-2 py-1 text-xs'>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <button onClick={() => {
                                        updateRole(user._id,selectedRoles[user._id] || user.role)
                                    }} className='bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs'>
                                        Save
                                    </button>
                                </td>

                                <td className='p-3'>
                                    <span className={`px-2 py-1 rounded text-white text-xs ${
                                        user.isBlocked ? "bg-red-500" : "bg-green-500"
                                    }`}>{user.isBlocked ? "Blocked" : "Active"}</span>
                                </td>

                                <td className='p-3 space-x-2'>
                                    <button
                                    onClick={() => {toggleBlock(user._id,user.isBlocked)}}
                                    className={`px-1 py-1 rounded text-white text-xs ${
                                        user.isBlocked ? "bg-green-600 hover:bg-green-700"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                    }`}
                                    >
                                        {user.isBlocked ? "Unblock" : <Ban/>}
                                    </button>

                                    <button
                                    onClick={() => deleteUser(user._id)}
                                    className='bg-red-600 hover:bg-red-700 ml-2 px-1 py-1 rounded text-xs mt-2 cursor-pointer active:scale-95'>
                                        <Trash2/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>

        <div className="md:hidden space-y-4">
            {filteredUsers.map((user) => (
        <div
          key={user._id}
          className="bg-white border rounded-xl p-4 shadow-sm"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">
              {user.username}
            </h3>
    
            <span
              className={`text-xs px-2 py-1 rounded text-white ${
                user.isBlocked ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {user.isBlocked ? "Blocked" : "Active"}
            </span>
          </div>
    
          <p className="text-sm text-gray-500">{user.email}</p>
    
          {/* Role */}
          <div className="mt-2">
            <span
              className={`text-xs px-2 py-1 rounded text-white ${
                user.role === "admin"
                  ? "bg-purple-600"
                  : user.role === "analyst"
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            >
              {user.role}
            </span>
          </div>
    
          {/* Role Change */}
          <select
            value={selectedRoles[user._id] || user.role}
            onChange={(e) =>
              setSelectedRoles({
                ...selectedRoles,
                [user._id]: e.target.value,
              })
            }
            className="w-full mt-3 border rounded px-2 py-1 text-sm"
          >
            <option value="user">User</option>
            <option value="analyst">Analyst</option>
            <option value="admin">Admin</option>
          </select>
    
          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() =>
                updateRole(user._id, selectedRoles[user._id] || user.role)
              }
              className="flex-1 bg-blue-600 text-white py-1 rounded text-sm"
            >
              Save
            </button>
    
            <button
              onClick={() => toggleBlock(user._id)}
              className={`flex-1 text-white py-1 rounded text-sm ${
                user.isBlocked
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {user.isBlocked ? "Unblock" : "Block"}
            </button>
    
            <button
              onClick={() => deleteUser(user._id)}
              className="bg-red-600 text-white py-1 rounded text-sm"
            >
              <Trash2/>
            </button>
          </div>
        </div>
    ))}
    </div>
    </div>
  )
}
