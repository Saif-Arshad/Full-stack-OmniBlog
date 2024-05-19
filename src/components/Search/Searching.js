"use client "
import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState} from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
function Searching() {
    const [search,setsearch] = useState("")
     const router = useRouter()
     const searchParams = useSearchParams()
    const path = usePathname()
     const getting = searchParams.get('filter1')
     console.log(getting)
   
     const submitSearch = async(e) =>{
        e.preventDefault() 
        // console.log("submit clicked search");
            if (!search) {
                alert("Please enter something to search")
            } 
                router.push(`/search?q=${search}`);       
    }
    // console.log(search);
  return (
    <div className='bg-white dark:bg-gray-900 py-5 px-6 md:py-14 md:px-20 ' >
            <h1 className='font-semibold text-xl md:text-5xl md:font-bold'>Discover the latest Articles on OnmiBlog</h1>
            <p className='mt-4 sm:mt-8 text-black dark:text-gray-200 w-4/4 sm:w-3/4 md:w-2/4 text-sm md:text-xl' >All articles are displayed here and you can quickly find what you are looking for using the search field.</p>
        <div className='mt-4'>
            
<form className="max-w-md" onSubmit={submitSearch}>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" onChange={(e)=>setsearch(e.target.value)} value={search}  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Articles..." required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-purple-800 hover:bg-purple-900  dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:focus:ring-blue-800">Search</button>
    </div>
</form>

        <div className="links text-sm mt-3 sm:mt-6 ">
 <Link href={"/"}>   <button className={`
    ${path=="/" ? "bg-purple-800 dark:hover:bg-blue-600 text-white" : "dark:hover:bg-blue-600 hover:bg-purple-800 hover:text-white"}
 hover:text-white dark:hover:bg-blue-600 rounded-xl box-border py-1 px-2 sm:py-2 sm:px-2`}>All</button></Link>
 <Link href={"/catagorie?filter1=technology"}>   <button className={`
 ${getting=="technology" ? "bg-purple-800 dark:hover:bg-blue-600 text-white" : "dark:hover:bg-blue-600 hover:bg-purple-800 hover:text-white"}

   dark:hover:bg-blue-600 rounded-xl box-border py-1 px-2 sm:py-2 sm:px-2`}>Technology</button></Link>
 <Link href={"/catagorie?filter1=food&filter2=health"}> 
   <button className={`
 ${getting=="food" ? "bg-purple-800 dark:hover:bg-blue-600 text-white" : "dark:hover:bg-blue-600 hover:bg-purple-800 hover:text-white"}

   hover:bg-purple-800 hover:text-white dark:hover:bg-blue-600 rounded-xl box-border py-1 px-2 sm:py-2 sm:px-2`}>Food & Health</button></Link>
 <Link href={"/catagorie?filter1=movie&filter2=sport"}>   <button className={`
 ${getting=="movie" ? "bg-purple-800 dark:hover:bg-blue-600 text-white" : "dark:hover:bg-blue-600 hover:bg-purple-800 hover:text-white"}

  rounded-xl box-border py-1 px-2 sm:py-2 sm:px-2`}>Movie & Sports</button></Link>
 <Link href={"/catagorie?filter1=news"}>   <button className={`
 ${getting=="news" ? "bg-purple-800 dark:hover:bg-blue-600 text-white" : "dark:hover:bg-blue-600 hover:bg-purple-800 hover:text-white"}

  rounded-xl box-border py-1 px-2 sm:py-2 sm:px-2`}>News</button></Link>
 <Link href={"/catagorie?filter1=fashion&filter2=lifestyle"}>   <button className={`
 ${getting=="fashion" ? "bg-purple-800 dark:hover:bg-blue-600 text-white" : "dark:hover:bg-blue-600 hover:bg-purple-800 hover:text-white"}

  rounded-xl box-border py-1 px-2 sm:py-2 sm:px-2`}>Fashion & Lifestyle</button></Link>


        </div>

        </div>
    </div>
  )
}

export default Searching
