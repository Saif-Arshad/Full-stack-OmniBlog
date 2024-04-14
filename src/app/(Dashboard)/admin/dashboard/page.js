/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import AdminSideBar from '@/components/AdminSideBar'
import React ,{useEffect,useState} from 'react'
import Greeting from '@/components/Greeting/Greeting'
import { AiOutlineLink } from "react-icons/ai";
import Link from 'next/link'
import { CiBullhorn } from "react-icons/ci";
import Loading from '@/components/Loading'
import { MdPostAdd } from "react-icons/md";
function page() {
  const [latest,setlatest] =useState([])
  const[loading,setloading] = useState(true)
useEffect(()=>{
  // setloading(true)
  const fetchingLatese= async ()=>{
    const data = await fetch(`${process.env.NEXT_PUBLIC_LIVE_HOST}/api/fetchblog`,{
      cache: 'no-store',
    });
    const req= await data.json();
    const sortedLatest = req.res.sort((a, b) => new Date(b.date) - new Date(a.date));
    setlatest(sortedLatest)
    setloading(false)

  }
  fetchingLatese()
},[])
const postlength = latest.length;
// console.log(latest);
  return (
    <div className='flex  min-h-screen bg-white dark:bg-slate-900'>
      <AdminSideBar/>
        <div className="content sm:ml-64 bg-white dark:bg-slate-900 w-full">

          <div className='p-11 w-full' >
    <h1 className='text-2xl sm:text-4xl font-bold'>Welcome back Admin 👋</h1>
      <Greeting/>
</div>
      {loading ? <Loading/> :
    <div className="DashMain flex flex-col flex-wrap sm:flex-row mt-8">
     <div className="sub w-full lg:w-1/2  flex flex-row gap-x-4 flex-wrap justify-center">
    <div className=" rounded-[25px] shadow-lg ml-0 md:ml-3 bg-white p-8 w-44 h-40 sm:h-48  mt-4 dark:bg-gray-600">
        <div className="h-8 md:h-12">
        <MdPostAdd size={45} />
        </div>
        <div className="my-2">
            <h2 className="text-2xl md:text-4xl mt-4 sm:mt-0 font-bold">{postlength}</h2>
        </div>

        <div>
            <p className="mt-2 font-sans text-base font-medium text-gray-500 dark:text-orange-600">Total Posts</p>
        </div>
    </div>
    <div className="w-fit rounded-[25px] shadow-lg ml-0 md:ml-3 bg-white p-8 h-40 sm:h-48  mt-4 dark:bg-gray-600">
        <div className="h-8 md:h-12">
        <CiBullhorn size={45} />
        </div>
        <div className="my-2">
            <h2 className="text-2xl mt-4 sm:mt-0 md:text-4xl font-bold">8</h2>
        </div>

        <div>
            <p className="mt-2 font-sans text-base font-medium text-gray-500 dark:text-orange-600">Total Catagories</p>
        </div>
    </div>
    

</div>
    <div className='sub sm:ml-8 lg:ml-0'>
      <h1 className='font-bold text-xl mt-5 sm:text-2xl text-purple-600 dark:text-orange-500'>Latest Articles</h1>
    <div className='py-6'>

        {
              latest.slice(0, 8).map((titles, index) => (
            // eslint-disable-next-line react/jsx-key
            <Link href={`/blog/${titles._id}`}>
                <h2 className='md:font-semibold flex items-center justify-center sm:text-lg mt-1 hover:text-purple-800 dark:hover:text-orange-400 cursor-pointer' key={index}>
                 <AiOutlineLink size={25}/>
              {titles.title.length > 50 ? `${titles.title.substring(0, 45)}....` : titles.title}

                  </h2>
             </Link>
              ))
            }
            </div>
    </div>
    </div>

          }
       
        </div>

      
    </div>
  )
}

export default page
