
import { CircleUserRound, LogOut, Logs, X} from 'lucide-react'

import { Link, Navigate } from 'react-router-dom'
import SearchToggle from './SearchToggle'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthProvider'


function Navbar() {
  const [ isOpen, setisOpen] = useState(false)
  const { setUser } = useAuth()

  const menuClose = useRef(null)
  useEffect(()=>{

    function handleOutsideClick(event){
        if(menuClose.current && !menuClose.current.contains(event.target)){
            setisOpen(false)
        }
    }
    document.addEventListener("mousedown",handleOutsideClick)
    return () => {
        document.removeEventListener("mousedown",handleOutsideClick)
    }
  },[menuClose])
  
  return (
    <nav className='fixed top-0 left-0 w-full z-50  '>
     
      <div className=' flex items-center justify-between bg-gray-400  text-black  p-4 w-full  ' >
        <div className='relative' ref={menuClose}>
          <button className='md:hidden' onClick={() => {
            setisOpen(!isOpen)
          }}>{isOpen?<X/>:<Logs/>}</button>
        {isOpen && (
          <div className='bg-gray-400  p-4 mt-4  absolute top-full left-0  z-100 -ml-4 '>
            <div className='flex flex-col gap-6 font-semibold md:hidden'>
          <Link to='/' onClick={() => setisOpen(false)}>Home</Link>
          <Link to='/user/profile' onClick={() => setisOpen(false)}><CircleUserRound/></Link>
          <button onClick={() => {
            localStorage.removeItem("accessToken")
            setUser(null)
            Navigate("/login")
          }} className='cursor-pointer'><LogOut className=' hover:bg-amber-500 rounded-2xl w-5'/></button>
            </div>
          </div>
        )}
        </div>

        <div className='flex text-xl font-bold gap-2'>
            <Link to='/'>Notes</Link>
        </div>



        <div className='flex  gap-3 '>
          <SearchToggle/>
          <div className='hidden md:flex gap-6 font-semibold'>

          <Link to='/'>Home</Link>
          <Link to='/user/profile'><CircleUserRound/></Link>
          <button onClick={() => {
            localStorage.removeItem("accessToken")
            setUser(null)
            Navigate("/login")
          }} className='cursor-pointer'><LogOut className=' hover:bg-amber-500 rounded-2xl w-5'/></button>
          </div>

        </div>


    </div>
    </nav>

  )
}

export default Navbar