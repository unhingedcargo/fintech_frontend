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
            <li><Link className='text-lg rounded-full border-2 border-gray-900 hover:border-2 hover:border-amber-400 hover:text-amber-400 focus:border-2 px-6 py-3 active:bg-amber-400 active:text-black' href="/estimate/create-new">Create Estimate</Link></li>
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


// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import { MdAccountCircle } from "react-icons/md";
// import { FaBars } from "react-icons/fa";

// export default function Navbar({ toggleSidebar }) {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="fixed top-0 w-full z-50 bg-gray-900 text-white shadow-md">
//       <nav className="flex items-center justify-between px-6 py-3">
//         {/* Left side */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={toggleSidebar}
//             className="text-xl lg:hidden block"
//             aria-label="Toggle Sidebar"
//           >
//             <FaBars />
//           </button>
//           <Link href="/" className="text-2xl font-bold hover:text-amber-400">
//             Navbar
//           </Link>
//         </div>

//         {/* Center (desktop nav links) */}
//         <ul className="hidden lg:flex items-center gap-6">
//           <li>
//             <Link
//               href="/"
//               className="hover:text-amber-400 transition-colors duration-300"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/about"
//               className="hover:text-amber-400 transition-colors duration-300"
//             >
//               About
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/contact"
//               className="hover:text-amber-400 transition-colors duration-300"
//             >
//               Contact
//             </Link>
//           </li>
//         </ul>

//         {/* Right side */}
//         <div className="relative">
//           <button
//             onClick={() => setProfileOpen(!profileOpen)}
//             className="cursor-pointer"
//           >
//             <MdAccountCircle fontSize={32} className="text-amber-300" />
//           </button>

//           {profileOpen && (
//             <ul className="absolute right-0 mt-2 min-w-[150px] rounded-lg border border-slate-200 bg-white text-black shadow-lg z-20">
//               <li>
//                 <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/settings" className="block px-4 py-2 hover:bg-gray-200">
//                   Settings
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/logout" className="block px-4 py-2 hover:bg-gray-200">
//                   Logout
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="lg:hidden block ml-4"
//         >
//           <FaBars />
//         </button>
//       </nav>

//       {/* Collapsible Mobile Links */}
//       {menuOpen && (
//         <div className="lg:hidden bg-gray-800 px-6 py-3 space-y-3">
//           <Link href="/" className="block hover:text-amber-400">
//             Home
//           </Link>
//           <Link href="/about" className="block hover:text-amber-400">
//             About
//           </Link>
//           <Link href="/contact" className="block hover:text-amber-400">
//             Contact
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }
