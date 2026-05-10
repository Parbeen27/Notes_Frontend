import { Search } from 'lucide-react';
import  { useEffect, useRef } from 'react'
import { useState } from 'react'
function SearchToggle() {
  const [showSearch,setSearch] = useState(false)
  const searchRef = useRef(null)
  const inputRef = useRef(null)
  const handleClick = () => {
    setSearch(!showSearch);
  }
  useEffect(()=>{
    if(showSearch){
        inputRef.current?.focus()
    }
    function handleOutsideClick(event){
        if(searchRef.current && !searchRef.current.contains(event.target)){
            setSearch(false)
        }
    }
    document.addEventListener("mousedown",handleOutsideClick)
    return () => {
        document.removeEventListener("mousedown",handleOutsideClick)
    }
  },[showSearch])
  return (
    <div className=' flex' ref={searchRef}>
        <button onClick={handleClick} className='cursor-pointer'>{showSearch?"":<Search/>}</button>
          {showSearch && (
        <form>
            <input ref={inputRef} type='text' placeholder='Search...' className='bg-white'/>
        </form>
          )}
    </div>
  )
}

export default SearchToggle