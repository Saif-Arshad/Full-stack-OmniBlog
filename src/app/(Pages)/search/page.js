/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Searching from '@/components/Search/Searching';
import Dummy from '../../../../public/Images/Dummy/download.jpg'
import Loading from '@/components/Loading';
import '@/app/Stylesheets/Home.scss';
import { useSearchParams } from 'next/navigation';
import Searchloader from '@/components/Searchloader/Searchloader';
export default function page() {
    const searchParams = useSearchParams();
  const searchURL = searchParams.get('q');
  console.log(searchURL);
   const [data,setdata] = useState([])
  const [load,setload] = useState(6)
  const [loading,setloading]=useState(true)

  useEffect(() => {
    try {
      const fetchSearch = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LIVE_HOST}/api/searchblog?q= ${searchURL}`,{
          cache: 'no-store',
        })
        const serverData =await res.json()
        const searchdata = serverData.searchAnswer
        setdata(searchdata)

      
        setloading(false)
      }

        fetchSearch()
    } catch (error) {
      throw error.message
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ searchURL])
  console.log(data);

  const loadmore = () => {
    setload(load + 6)
  }
  return (
    <>
    <Searching />
    {loading ? (
      <Loading />
    ) : (
      <>
        {data.length === 0 ? (
          <Searchloader search={`${searchURL}`}/>
        ) : (
          <div className='bg-white dark:bg-slate-900 main-hero'>
            {data.slice(0,load).map((blog) => (
              <div key={blog._id} className="main-card">
                <Link href={`/blog/${blog._id}`}>
                  <Image
                    className="main-image"
                    src={`${blog.image}`}
                    alt={`${blog.title}`}
                    width={500}
                    height={144}
                  />
                </Link>
                
                <div className="p-5">
                  <span className='text-lg capitalize font-bold text-purple-700 dark:text-blue-600'>{blog.categorie}</span>
                  <Link href={`/blog/${blog._id}`}>
                    <h5 className="mb-2 text-lg sm:text-xl dark:hover:text-blue-500  hover:text-blue-500 hover:underline capitalize font-semibold mt-4 tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                  </Link>
                  <Link href={`/blog/${blog._id}`}>
                
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {blog.maincontent.length > 150 ? `${blog.maincontent.substring(0, 90)}...` : blog.maincontent}
                  </p>
                  </Link>
                  
                  <div className='flex flex-wrap gap-1 mt-6 items-center text-purple-800 dark:text-blue-700 font-semibold'>
                    <Image 
                      className='rounded-xl'
                      src={Dummy}
                      height={20}
                      width={25}
                      alt={blog.author}
                    />
                    {blog.author}
                  </div>
                  {/* <Link href={`/blog/${blog._id}`} className=" inline-flex items-center px-3 py-2 mt-5 text-lg font-semibold hover:underline text-center text-black hover:text-blue-950 dark:text-white ">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                  </Link> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    )}
    {data.length > load && (
      <div className="flex justify-center py-8 bg-white dark:bg-slate-900">
        <button onClick={loadmore} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700">
          Load More Articles
        </button>
      </div>
    )}
  </>
  )
}
