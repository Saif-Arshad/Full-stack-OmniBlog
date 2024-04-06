'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/Images/Logo/icon.png'
import { useTheme } from 'next-themes'

function Nav(props) {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
      <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900 shadow-xl ">
        <div className="flex flex-wrap flex-col sm:flex-row   items-center sm:justify-between justify-center max-w-screen-xl px-4 mx-auto">
          <Link href="/" >
          <span className="self-center flex items-center text-2xl font-bold whitespace-nowrap text-orange-500">
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
          <div className="flex items-center gap-x-8 mt-5 ml-2  sm:gap-x-0 sm:mt-0 sm:ml-0 lg:order-2">
          <div className=" flex justify-center items-center ">
          {props.home ? 
            <Link
            href="/"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
          >
            Home

          </Link> 
          :
          <Link
          href="/admin"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
        >
          Dashboard

        </Link>
        }
          
          <button onClick={toggleTheme} className="h-12 w-12 rounded-lg p-2 hover:scale-105 ">
    <svg className="fill-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
    <svg className="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
        <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
</button>
</div>
           
          </div>
      
          {/* <button onClick={toggleTheme} className='text-black dark:bg-bg-success '>theme</button> */}

          </div>
      </nav>
  );
}

export default Nav;
