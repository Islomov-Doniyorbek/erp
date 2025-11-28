import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'

const Header = () => {
  return (
    <header className="relative flex justify-between py-3 px-4 bg-[#ffffff] text-black">
          <div className="ico">
            <MdMenu className='text-4xl'/>
          </div>
          <div className=" flex gap-5 text-3xl text-[#6930C3]">
            <FaBell/>
            <FaUserCircle/>
          </div>
    </header>
  )
}

export default Header
