import React from 'react'
import { Nav } from './menu'

// type Props = {}

const Header = () => {
  return (
    <div className='flex justify-between bg-black px-5 py-8 '>
    <div className='text-4xl text-white'>
        🌊Springshed
    </div>
    <Nav />
    </div>
  )
}

export default Header