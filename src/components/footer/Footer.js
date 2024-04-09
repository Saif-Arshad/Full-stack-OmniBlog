"use client"
import React , {useEffect,useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/Images/Logo/icon.png'
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const today = currentYear > 2020 ? ` - ${currentYear}` : '';

  const [latest,setlatest] =useState([])
  useEffect(()=>{
    const fetchingLatese= async ()=>{
      const data = await fetch('/api/fetchblog');
      const response = await data.json();
      const sortedLatest = await response.res.sort((a, b) => new Date(b.date) - new Date(a.date));
      setlatest(sortedLatest)
    }
    fetchingLatese()
  },[])
  console.log(latest);

  return (
      <footer>
        <div className="bg-white py-4 text-black dark:bg-slate-900 dark:text-gray-200 shadow-2xl">
          <div className="container px-4 mx-auto">
            <div className="-mx-4 flex flex-wrap justify-between">
            <div className="px-4 my-4 w-full xl:w-1/5">
            <Link href="/" className="block w-56 mb-6">
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
            <p className="text-justify">
            OmniBlog is a platform that provides informative articles and blog posts about various aspects of life. Whether you are interested in current events, lifestyle, health, and technology  you will find a wealth of insightful and engaging content on our website. 
            </p>
          </div>

          <div className="px-4 my-4 w-full sm:w-auto">
            <div>
              <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-purple-700 dark:border-blue-700">Categories</h2>
            </div>
            <ul className="leading-8">
              <li><Link 
               href="/catagorie?filter1=technology"
              className="hover:text-purple-700 dark:hover:text-blue-400">Technology</Link></li>
              <li><Link
                href="/catagorie?filter1=food&filter2=health"
               className="hover:text-purple-700 dark:hover:text-blue-400">Food & Health</Link></li>
              <li><Link
              href="/catagorie?filter1=movie&filter2=sport"
               className="hover:text-purple-700 dark:hover:text-blue-400">Movie & Sports</Link></li>
              <li><Link
               href="/catagorie?filter1=news"
                className="hover:text-purple-700 dark:hover:text-blue-400">News</Link></li>
              <li><Link
               href="/catagorie?filter1=fashion&filter2=lifestyle"
               className="hover:text-purple-700 dark:hover:text-blue-400">Fashion & Lifestyle</Link></li>
            </ul>
          </div>
          <div className="px-4 my-4 w-full sm:w-auto">
            <div>
              <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-purple-700 dark:border-blue-700">Latest Blog</h2>
            </div>
            <ul className="leading-8">
              {
              latest.slice(0, 4).map((titles, index) => (
                // eslint-disable-next-line react/jsx-key
                <li key={index}><Link href={`/blog/${titles._id}`} className="hover:text-purple-700 dark:hover:text-blue-400">{titles.title}</Link></li>

              ))
            }
              <li><Link href="/" className="hover:text-purple-700 dark:hover:text-blue-400">See More</Link></li>
            </ul>
          </div>
          <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
            <div>
              <h2 className="inline-block text-2xl pb-4 mb-4 border-b-4 border-purple-700 dark:border-blue-700">Connect With Us</h2>
            </div>
            <Link href="https://www.facebook.com/profile.php?id=100086295243570" target='_blank' className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-purple-700 dark:hover:text-blue-400 hover:border-purple-700 dark:hover:border-blue-700">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </Link>
            <Link href="https://twitter.com/saifurrehmanpro" target='_blank' className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-purple-700 dark:hover:text-blue-400 hover:border-purple-700 dark:hover:border-blue-700">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </Link>
            <Link href="https://github.com/Saif-Arshad" target='_blank' className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-purple-700 dark:hover:text-blue-400 hover:border-purple-700 dark:hover:border-blue-700">
              <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
            </Link>
            <Link href="https://www.linkedin.com/in/saif-rehman-professional/" target='_blank' className="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-purple-700 dark:hover:text-blue-400 hover:border-purple-700 dark:hover:border-blue-700">
              <svg  className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>
            </Link>

          </div>
        </div>
      </div>
    </div>
        <div className="dark:bg-slate-950 bg-slate-100 py-4 text-black dark:text-white">
          <div className="container mx-auto px-4">
            <div className="-mx-4 flex items-center justify-center">
              <div className="px-4 w-full text-center sm:w-auto sm:text-left">
                Copyright © 2023{today} - OmniBlog. All Rights Reserved.
              </div>

            </div>
          </div>
        </div>
      </footer>
  );
}
