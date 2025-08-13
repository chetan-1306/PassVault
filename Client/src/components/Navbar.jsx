import { a } from 'framer-motion/client'
import React from 'react'

const Navbar = ({ username, onLogout, isAuthenticated }) => {
  const handelClick = () => {
    window.location.href = "https://github.com/chetan-1306/PassVault";
  }

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('username');
    onLogout();
  }

  return (
    <>
    <nav className='flex justify-between items-center px-16 h-16 text-white sticky top-0'>
        <div className='logo font-bold text-2xl'> <span className='text-[#B0BEC5]'>&lt;</span>Pass<span className='text-[#B0BEC5]'>Vault/&gt;</span></div>
        <ul>
            <li className='flex gap-5 items-center'>
                <a className="hover:font-semibold" href="#">Home</a>
                <a className="hover:font-semibold" href="#">About</a>
                <a className="hover:font-semibold" href="#">Contact me</a>
                <button onClick={handelClick} className='pl-1'> <img src="/icons/github_inverted.svg" alt="" className='w-6 h-6'/></button>
                
                {/* User Section - Only show when authenticated */}
                {isAuthenticated && username && (
                  <div className="flex items-center gap-4 ml-6 pl-6 border-l border-white/20">
                    {/* Welcome Message */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-black to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-300">
                        Welcome, <span className="text-purple-300 font-semibold">{username}</span>
                      </span>
                    </div>
                    
                    {/* Enhanced Logout Button */}
                    <button 
                      onClick={handleLogout}
                      className="group relative bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-600/20 hover:border-gray-500/40"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        Sign out of your account
                      </div>
                    </button>
                  </div>
                )}
            </li>
        </ul>
    </nav>
    <div className='bg-gray-500 mx-auto h-[0.1px] sticky top-16'></div>
    </>
  )
}

export default Navbar