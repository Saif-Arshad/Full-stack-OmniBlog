 /* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import Searching from '@/components/Search/Searching'
import Dummy from '../../../../public/Images/Dummy/download.jpg'
import '@/app/Stylesheets/Home.scss';
import Link from 'next/link'
import Loading from '@/components/Loading'

function page() {
  const param = useSearchParams();
  const urlDataone= param.get('filter1');
  const urlDatatwo= param.get('filter2');
  const [data, setdata]=useState([]);
  const [load,setload] = useState(6)
  const [loading,setloading]=useState(true)

  //console.log(urlDataone);
  //console.log(urlDatatwo);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/filterblog?filter1=${urlDataone}&filter2=${urlDatatwo}`,{
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
         // console.log(('Failed to fetch data'));
        }
        const filter = await response.json();
        setdata(filter.all.reverse());
        setloading(false)
      } catch (error) {
        throw error.message
        //console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [urlDataone, urlDatatwo])
  const loadmore = () => {
    setload(load + 6)
  }

  return (
    <Suspense>

    <>
    <Searching />
    {loading ? <Loading/> :
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
              <h5 className="mb-2 text-lg sm:text-xl  hover:text-blue-500 hover:underline capitalize font-semibold mt-4 tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
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
                >

                </Image>
              {blog.author}</div>
            {/* <Link href={`/blog/${blog._id}`} className=" inline-flex items-center px-3 py-2 mt-5 text-lg font-semibold  text-center text-black hover:text-blue-950 dark:text-white ">
              Read more
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </Link> */}
          </div>
        </div>
      ))}
    </div>
}
    {data.length > load && (
              <div className="flex justify-center py-8 bg-white dark:bg-slate-900">
                <button onClick={loadmore} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700">
                  Load More Articles
                </button>
              </div>
            )}
  </>
            </Suspense>
  )
}

export default page
