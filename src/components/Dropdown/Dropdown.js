'use client'
import React, { useState } from 'react';
import Link from 'next/link';

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    const closedropdown = () => {
      setIsOpen(false);
    }
  return (
    <div className=' min-w-9 flex flex-col ml-16 sm:ml-32  md:ml-52 lg:ml-72 mt-4 '>
          <button 
          id="dropdownDefaultButton" 
          onClick={toggleDropdown} 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
          type="button"
        >
          Select Catagories
          <svg className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
          </svg>
        </button>

        <div 
          id="dropdown" 
          className={`z-10 ${isOpen ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=All" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All Articles</Link>
            </li>
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=technology" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Technology</Link>
            </li>
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=food" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Food</Link>
            </li>
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=health" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Health</Link>
            </li>
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=movie" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Movie</Link>
            </li>
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=sports" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sports</Link>
            </li>
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=fashion" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Fashion</Link>
            </li>
            <li>
              <Link onClick={closedropdown} href="/admin/dashboard/all-posts?blog=lifestyle" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">LifeStyle</Link>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Dropdown
