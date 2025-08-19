"use client"
import React from 'react';
import Link from 'next/link';
import {MdAccountCircle} from "react-icons/md";
import { useState } from 'react';

export default function Navbar() {

  const [clicked, setClicked] = useState(false)

  function isclicked() {
    setClicked(!clicked);
    let profile = document.getElementById("profile-menu");
    clicked?profile.style.display='none':profile.style.display='block';
  }

  return (
    <>
      <div className="fixed top-0 w-full z-50 mb-16">
      <div className='bg-gray-900 mb-1'>
        <nav className='flex flex-row justify-around'>
          <Link className='text-3xl p-5 text-white hover:text-amber-400' href='/'>Navbar</Link>
          <ul className='flex flex-row justify-center items-center gap-5 text-white'>
            <li><Link className='text-lg rounded-full border-2 border-gray-900 hover:border-2 hover:border-amber-400 hover:text-amber-400 focus:border-2 px-6 py-3 active:bg-amber-400 active:text-black' href="/">Home</Link></li>
            <li><Link className='text-lg rounded-full border-2 border-gray-900 hover:border-2 hover:border-amber-400 hover:text-amber-400 focus:border-2 px-6 py-3 active:bg-amber-400 active:text-black' href="/about">About</Link></li>
            <li><Link className='text-lg rounded-full border-2 border-gray-900 hover:border-2 hover:border-amber-400 hover:text-amber-400 focus:border-2 px-6 py-3 active:bg-amber-400 active:text-black' href="">Contact</Link></li>
          
            <li>
              <button type="button" 
              data-popover-target="profile-menu" 
              className='cursor-pointer'
              onClick={isclicked}>
              <MdAccountCircle fontSize={36} color='oklch(82.8% 0.189 84.429)' />

              <div id="profile-menu" style={{'display':'none'}}
              className='text-right'
              > 
              <ul
              role='menu' 
              data-popover="profile-menu" 
              data-popover-placement="bottom" 
              className='absolute z-20 min-w-[100px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 focus:outline-none'
              >

                <Link role='menuitem' className='py-3 flex w-full text-black' href="">Clicko</Link>
                <Link role='menuitem' className='py-3 flex w-full text-black' href="">Clicko</Link>
                <Link role='menuitem' className='py-3 flex w-full text-black' href="">Clicko</Link>

              </ul>
              </div>
              </button>
              </li>
          </ul>
        </nav>
      </div>
    </div>
    </>
  )
}
