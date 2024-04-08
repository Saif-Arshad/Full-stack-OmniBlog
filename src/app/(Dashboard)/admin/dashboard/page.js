/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import AdminSideBar from '@/components/AdminSideBar'
import React ,{useEffect,useState} from 'react'
import Greeting from '@/components/Greeting/Greeting'
import Image from 'next/image'
import { CiBullhorn } from "react-icons/ci";
import { MdPostAdd } from "react-icons/md";
function page() {
  const [latest,setlatest] =useState([])
useEffect(()=>{
  const fetchingLatese= async ()=>{
    const data = await fetch('/api/fetchblog');
    const response = await data.json();
    const sortedLatest = response.res.sort((a, b) => new Date(b.date) - new Date(a.date));
    setlatest(sortedLatest)
  }
  fetchingLatese()
},[])
console.log(latest);
  return (
    <div className='flex  min-h-screen  '>
      <AdminSideBar/>
        <div className="content sm:ml-64 bg-white dark:bg-gray-800 w-full">

          <div className='p-11 w-full' >
    <h1 className='text-2xl sm:text-4xl font-bold'>Welcome back Admin 👋</h1>
      <Greeting/>
</div>
    <div className="DashMain flex flex-col flex-wrap sm:flex-row mt-8">
     <div className="sub w-full lg:w-1/2  flex flex-row flex-wrap justify-center">
    <div className="w-fit rounded-[25px] shadow-lg ml-0 md:ml-3 bg-white p-8 h-48 mt-4 dark:bg-gray-600">
        <div className="h-8 md:h-12">
        <MdPostAdd size={45} />
        </div>
        <div className="my-2">
            <h2 className="text-2xl md:text-4xl font-bold"><span>2680</span> +</h2>
        </div>

        <div>
            <p className="mt-2 font-sans text-base font-medium text-gray-500 dark:text-orange-500">Total Posts</p>
        </div>
    </div>
    <div className="w-fit rounded-[25px] shadow-lg ml-0 md:ml-3 bg-white p-8 h-48 mt-4 dark:bg-gray-600">
        <div className="h-8 md:h-12">
        <CiBullhorn size={45} />
        </div>
        <div className="my-2">
            <h2 className="text-2xl md:text-4xl font-bold"><span>8</span> +</h2>
        </div>

        <div>
            <p className="mt-2 font-sans text-base font-medium text-gray-500 dark:text-orange-500">Total Catagories</p>
        </div>
    </div>
    

</div>
    <div className='sub ml-8 lg:ml-0 '>
      <h1 className='font-bold text-xl mt-5 sm:text-2xl text-purple-600 dark:text-orange-500'>Latest Articles</h1>
    <div className='py-6'>
        {
              latest.slice(0, 8).map((titles, index) => (
                <h2 className='font-normal text-sm sm:text-lg mt-1 hover:text-purple-600 dark:hover:text-orange-400 cursor-pointer' key={index}>{titles.title}</h2>
              ))
            }
            </div>
    </div>
    </div>

       
       
        </div>

      
    </div>
  )
}

export default page
