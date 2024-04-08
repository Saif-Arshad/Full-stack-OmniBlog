/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Searching from '@/components/Search/Searching'
function page() {
  const param = useSearchParams();
  const urlDataone= param.get('filter1');
  const urlDatatwo= param.get('filter2');
  const [data, setdata]=useState([]);
  console.log(urlDataone);
  console.log(urlDatatwo);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/filterblog?filter1=${urlDataone}&filter2=${urlDatatwo}`,{
          cache: 'no-store',
        });
        if (!response.ok) {
          console.log(('Failed to fetch data'));
        }
        const filter = await response.json();
        setdata(filter.all);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [urlDataone, urlDatatwo])
  return (
    <>
      <Searching />
      <div className='bg-white dark:bg-slate-900 flex flex-row flex-wrap justify-center gap-4'>
        {data.map((blog) => (
          <div key={blog._id} className="max-w-sm w-full md:w-1/3 bg-white border border-gray-200 rounded-xl dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="w-full object-contain h-36"
                src={`${blog.image}`}
                alt={`${blog.title}`}

              />
            </a>
            <div className='flex flex-wrap items-center justify-between px-5'>
              <span>{blog.categorie}</span>
            </div>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blog.maincontent.length > 150 ? `${blog.maincontent.substring(0, 50)}...` : blog.maincontent}
              </p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default page
