"use client"

import { useEffect, useState } from 'react';
import Searching from '@/components/Search/Searching';
import Image from 'next/image';
import Dummy from '../../../public/Images/Dummy/download.jpg'
import '@/app/Stylesheets/Home.scss';
import Link from 'next/link';
export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch('/api/fetchblog',{
        cache: 'no-store',
      });
      const Blogdata = await res.json();
      setData(Blogdata.res.reverse())
    };
    fetching();
  }, []);

  console.log(data);

  return (
    <>
      <Searching />

      <div className='bg-white dark:bg-slate-900 main-hero'>
        {data.slice(0).map((blog) => (
          <div key={blog._id} className="main-card">
            <a href="#">
              <Image
                className="main-image"
                src={`${blog.image}`}
                alt={`${blog.title}`}
                width={500}
                height={144}
              />
            </a>
           
            <div className="p-5">
            <span className='text-lg capitalize font-bold text-purple-700'>{blog.categorie}</span>

              <a href="#">
                <h5 className="mb-2 text-lg sm:text-xl  hover:text-blue-500 hover:underline capitalize font-semibold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {blog.maincontent.length > 150 ? `${blog.maincontent.substring(0, 90)}...` : blog.maincontent}
              </p>
              
              <div className='flex flex-wrap gap-1 items-center text-purple-800 font-semibold'>
                  <Image 
                  className='rounded-xl'
                  src={Dummy}
                    height={20}
                    width={25}
                    alt={blog.author}
                  >

                  </Image>
                {blog.author}</div>
              <Link href="#" className=" inline-flex items-center px-3 py-2 mt-5 text-lg font-semibold hover:underline text-center text-black hover:text-blue-950 dark:text-white ">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
