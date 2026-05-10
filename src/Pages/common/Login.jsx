import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import { useState } from "react"
import api from "../../services/api"
import { Bounce, toast } from "react-toastify"
function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [ form, setForm ] = useState({
    identifier: '',
    password: ''
  })
  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const res = await api.post("/auth/login",form)
        setUser({
          role: res.data.role,
          email: res.data.email,
          id: res.data.id
        })
      localStorage.setItem("accessToken",res.data.accessToken)
      localStorage.setItem("role", res.data.role);
      
  
      const role = res.data.role
      
      if(role === "admin") navigate("/admin")
      else navigate("/")
    } catch (err) {
      console.error(err.response?.data.message || err.message);
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

  <div className="bg-blue-200 w-full max-w-md p-8 rounded-3xl shadow-2xl">

    <h1 className="text-3xl font-bold text-center text-blue-950 mb-6">
      Sign In
    </h1>

    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

      <input
        name="identifier"
        type="text"
        placeholder="Username or Email..."
        onChange={handleChange}
        autoFocus
        required
        className="p-3 rounded-xl border border-blue-300 outline-none focus:ring-2 focus:ring-blue-600"
      />

      <input
        name="password"
        type="password"
        placeholder="Password..."
        onChange={handleChange}
        required
        className="p-3 rounded-xl border border-blue-300 outline-none focus:ring-2 focus:ring-blue-600"
      />

      <button
        type="submit"
        className="bg-blue-900 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-800 transition active:scale-95"
      >
        Login
      </button>

      <p className="text-center text-sm text-blue-900 mt-2">
        Login with
      </p>

      <div className="flex justify-center gap-6 mt-2">

        <a href="#">
          <img
            src="https://www.pngall.com/wp-content/uploads/13/Google-Logo-PNG-Images.png"
            alt="Google"
            className="h-10 hover:scale-110 transition"
          />
        </a>

        <a href="#">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/023/986/516/small/facebook-logo-facebook-logo-transparent-facebook-icon-transparent-free-free-png.png"
            alt="Facebook"
            className="h-10 hover:scale-110 transition"
          />
        </a>

      </div>

      <p className="text-center text-sm mt-4 text-blue-950">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold underline">
          Sign Up
        </Link>
      </p>

    </form>

  </div>

</div>
  )
}


export default Login
