import { a } from 'framer-motion/client'
import React from 'react'

const Navbar = () => {
  const handelClick = () => {
    window.location.href = "https://github.com/chetan-1306/PassVault";
  }
  return (
    <>
    <nav className='flex justify-between items-center px-16 h-16 text-white sticky top-0'>
        <div className='logo font-bold text-2xl'> <span className='text-[#B0BEC5]'>&lt;</span>Pass<span className='text-[#B0BEC5]'>Vault/&gt;</span></div>
        <ul>
            <li className='flex gap-5 '>
                <a className="hover:font-semibold" href="#">Home</a>
                <a className="hover:font-semibold" href="#">About</a>
                <a className="hover:font-semibold" href="#">Contact me</a>
                <button onClick={handelClick} className='pl-1'> <img src="/icons/github_inverted.svg" alt="" className='w-6 h-6'/></button>
            </li>
        </ul>
    </nav>
    <div className='bg-gray-500 mx-auto h-[0.1px] sticky top-16'></div>
    </>
  )
}

export default Navbar