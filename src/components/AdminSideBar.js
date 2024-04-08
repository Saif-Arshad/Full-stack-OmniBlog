'use client'
  // eslint-disable-next-line react-hooks/rules-of-hooks
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes'
import Logo from '../../public/Images/Logo/icon.png'
import { MdAddBox } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { BsDatabaseFillDown } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { BsFillSunFill } from "react-icons/bs";

function AdminSideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter()
  // function for logout  
  const logout= async()=>{
try {
    await fetch("/api/admin/logout")
    router.push("/")
} catch (error) {
  console.log(error);
}
  }
  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { theme, setTheme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const darkmode = ()=>{
    setTheme("dark");
    setDropdownOpen(false);
  }
  const lightmode = ()=>{
    setTheme("light");
    setDropdownOpen(false);
  }
  return (
    <>
      {sidebarOpen && window.innerWidth <= 640 && ( 
        <button onClick={toggleSidebar} className="absolute top-0 right-0 p-2 mt-2 mr-3 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
          <span className="sr-only">Close sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3.293 3.293a1 1 0 0 1 1.414 0L10 8.586l5.293-5.293a1 1 0 0 1 1.414 1.414L11.414 10l5.293 5.293a1 1 0 1 1-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 1 1-1.414-1.414L8.586 10 3.293 4.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      <button onClick={toggleSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
         <span className="sr-only">Open sidebar</span>
         <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
         </svg>
      </button>

      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? '' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
         <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
         <Link href="/" >
          <span className="self-center ml-4 py-6 flex items-center text-2xl font-bold whitespace-nowrap text-orange-500">
                Omni
            <Image
              src={Logo}
              className="h-9"
              alt="Omni Logo"
              height={100}
              width={30}
            />
              log
            </span>
          </Link>
            <ul className="space-y-2 font-medium mt-8">
               <li>
                  <Link href="/admin/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="w-5 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <TbLayoutDashboard size={25} />
                  </span>
                     <span className="ms-3">Dash Home </span>
                  </Link>
               </li>
               <li>
            <Link href="/admin/dashboard/create-blog" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="w-5 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                  <MdAddBox size={25} />
                  </span>
               
               <span className="flex-1 ms-3 whitespace-nowrap">Add Article</span>
            </Link>
         </li>
         <li>
            <Link href="/admin/dashboard/all-posts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <span className="w-5 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
            <BsDatabaseFillDown size={25} />
                  </span>
               
               <span className="flex-1 ms-3 whitespace-nowrap">CRUD Operation</span>
            </Link>
         </li>
         <li>
        <div className="relative mt-10">
          <button onClick={toggleDropdown} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          
          <span className="w-5 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          <BsFillSunFill size={25} />
                  </span>
            <span className="flex-1 ms-3 whitespace-nowrap">Select Theme</span>
          </button>
          {dropdownOpen && (
            <div className="absolute mt-1 right-1 top-full min-w-max shadow rounded bg-gray-300 border border-gray-400 transition delay-75 ease-in-out z-10">
              <ul className="block text-right text-gray-900">
                <li onClick={lightmode}><span className="block px-3 py-2 cursor-pointer hover:bg-gray-200">
            Light Mode
                  </span></li>
                <li onClick={darkmode}><span className="block px-3 py-2 cursor-pointer hover:bg-gray-200">
            Dark Mode
                  </span></li>
              </ul>
            </div>
          )}
        </div>
      </li>
         <div className='h-2 mt-8 w-60 border-b-2 border-primary '>

         </div>
         <li>
            <button onClick={logout}  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-700 dark:hover:bg-gray-700 group">
            <span className="w-5 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
            <CgLogOut size={25} />
                  </span>
               <span  className="flex-1 ms-3 whitespace-nowrap group-hover:text-white">Log out</span>
            </button>
         </li>

            </ul>
         </div>
      </aside>
    </>
  );
}

export default AdminSideBar;
