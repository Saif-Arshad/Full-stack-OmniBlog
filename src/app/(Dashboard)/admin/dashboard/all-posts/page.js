"use client"
import React, { useEffect, useState } from 'react';
import AdminSideBar from '@/components/AdminSideBar';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Pencil from '../../../../../../public/Images/SVG/pencil-svgrepo-com.svg'
import Delete from '../../../../../../public/Images/SVG/delete-svgrepo-com.svg'

function Page() {
  const searchParams = useSearchParams();
  const blogUrl = searchParams.get('blog');
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/blog/filtering?blog=${blogUrl}`);
        if (!response.ok) {
          console.log('Failed to fetch data');
          return;
        }
        const filter = await response.json();
        setData(filter.all);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [blogUrl]);

  useEffect(() => {
    console.log(Data);
  }, [Data]);
      

  const DeleteNow =async (id) => {
    const confirming = confirm(`Are you sure you want to delete this article ?`);
    if (confirming) {
      const response = await fetch(`/api/admin/blog/deleteing?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        window.location.reload();
        console.log('Article deleted successfully');
      } else {
        console.log('Failed to delete article');
      }
    } {
      
    }
  }



  return (
    <div className="flex sm:ml-64">
      <AdminSideBar />
      <div className="flex flex-col w-full">
        <Dropdown />
        {
          Data.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <p className="text-2xl font-bold">Select Catagories to see Posts</p>
            </div>
          ) :
          <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Data.map((data) => (
                  <div key={data._id} className="p-4">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                      <Image
                        height={722}
                        width={402}
                        className="lg:h-48 md:h-36 w-full object-contain object-center"
                        src={data.image}
                        alt={data.title}
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium capitalize text-gray-400 mb-1">
                          {data.categorie}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{data.title}</h1>
                        <p className="leading-relaxed mb-3">
                          {data.maincontent.length > 150 ? `${data.maincontent.substring(0, 50)}...` : data.maincontent}
                        </p>
                        <div className="flex items-center flex-wrap flex-col">
                        <div className='flex mb-5 justify-between w-1/3'>
                    <Link
                      href={`/admin/dashboard/edit-blog/${data._id}`}
                    >
                        <Image
                        className='cursor-pointer hover:scale-105'
                          src={Pencil}
                          height={20}
                          width={30}
                          alt='Edit'
                        >
                        </Image>
                        </Link>
                   <button onClick={()=>DeleteNow(data._id)} className='bg-transparent border-none'>
                        <Image
                        className='cursor-pointer hover:scale-105'
                          src={Delete}
                          height={40}
                          width={30}
                          alt='Delete'
                        >
                        </Image>
                        </button> 
                        </div>
                        
                          <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            Read More
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5l7 7-7 7"></path>
                            </svg>
                          </a>
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        }
     
      </div>
    </div>
  );
}

export default Page;
