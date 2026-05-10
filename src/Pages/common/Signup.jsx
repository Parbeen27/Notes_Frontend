import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Bounce, toast } from 'react-toastify'
import axios from 'axios'
import api from '../../services/api'
function SignUp() {
  const navigate = useNavigate()
    const [form, setform] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post(
                "/auth/register",
                form
            )
            
            toast.success("User Registered",{
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
                transition: Bounce
            })
            navigate("/login")
            
        } catch (err) {
            console.error(err.response?.data || err.message);
            toast.error(err.response?.data.message || err.message,{
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
                transition: Bounce
            })
            
        }
        
    }
  return (

<div className="min-h-screen bg-blue-950 flex items-center justify-center px-4">
  
  <div className="bg-blue-200 p-8 rounded-2xl shadow-xl w-full max-w-md">
    
    <h1 className="text-3xl font-bold text-center text-blue-950 mb-6">
      Sign Up
    </h1>

    <form className="flex flex-col gap-4">

      <input
        type="text"
        placeholder="Name"
        className="p-3 rounded-xl border border-blue-300 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        placeholder="Email"
        className="p-3 rounded-xl border border-blue-300 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        className="p-3 rounded-xl border border-blue-300 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition active:scale-95"
      >
        Create Account
      </button>

    </form>

    <p className="text-center mt-5 text-sm text-blue-900">
      Already have an account?{" "}
      <a href="/login" className="font-semibold underline">
        Login
      </a>
    </p>

  </div>

</div>


  )
}

export default SignUp
