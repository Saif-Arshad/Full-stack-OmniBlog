"use client"
import React, { useEffect, useState } from 'react';
import AdminSideBar from '@/components/AdminSideBar';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BsPencilFill } from "react-icons/bs";
import { AiOutlineDelete,AiOutlineArrowRight } from "react-icons/ai";

function Page() {
  const searchParams = useSearchParams();
  const blogUrl = searchParams.get('blog');
  const [Data, setData] = useState([]);
  const [showCount, setShowCount] = useState(4);

  useEffect(() => {
    if (blogUrl) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/admin/blog/filtering?blog=${blogUrl}`,{
            cache: 'no-store',
          });
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
    }
    else{
      const fetchall = async () => {
        try {
          const response = await fetch(`/api/fetchblog`,{
            cache: 'no-store',
          });
          if (!response.ok) {
            console.log('Failed to fetch data');
            return;
          }
          const filter = await response.json();
          setData(filter.res.reverse());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchall();
    }
   
  }, [blogUrl]);

  useEffect(() => {
    console.log(Data);
  }, [Data]);
      

  const DeleteNow =async (id) => {
    const confirming = confirm(`Are you sure you want to delete this article ?`);
    if (confirming) {
      const response = await fetch(`/api/admin/blog/deleteing?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
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


  const loadMore = () => {
    setShowCount(showCount + 4);
  };

  return (
    <div className="flex min-h-screen sm:ml-64 bg-white dark:bg-slate-800">
      <AdminSideBar />
      <div className="flex flex-col ">
        <div className='flex flex-wrap items-center justify-center'>
        <Dropdown />
        </div>
          <div className='w-full'>
          <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
  <div className="flex flex-wrap gap-4 justify-center">
    {Data.slice(0,showCount).map((data, index) => (
      <div key={index} className="w-full sm:w-auto">
        <div className="flex flex-col bg-white border dark:bg-gray-800 border-gray-300 rounded-xl overflow-hidden">
            <div className="relative w-full h-32 flex-shrink-0">
            <Image
              className="absolute inset-0 w-full h-full object-cover"
              src={data.image}
              alt={data.title}
              height={100}
              width={200}
            />
          </div>
          <div className='flex justify-around'>
          <h3 className='ml-4 mt-4 capitalize font-semibold text-purple-600'>{data.categorie}</h3>
          <h3 className='ml-4 mt-4 capitalize font-semibold text-purple-600'>{data.author}</h3>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <p className="text-fw-normal  sm:text-xl font-bold text-black dark:text-white capitalize">{data.title}</p>
            <p className="text-gray-500 dark:text-white">
                  {data.maincontent.length > 150 ? `${data.maincontent.substring(0, 60)}...` : data.maincontent}
         
            </p>
            <div className='flex space-x-4 flex-wrap  justify-center'>
            <Link href={`/admin/dashboard/edit-blog/${data._id}`} >
              <button className='flex items-center text-lg font-semibold text-purple-600 dark:text-white'>
            <BsPencilFill size={16} />
            Edit
            </button>
                        </Link>
                           
                   <button onClick={()=>DeleteNow(data._id)} className= 'flex items-center text-lg font-semibold text-purple-600 dark:text-white'>
                   <AiOutlineDelete size={16} />
            Delete
                      </button> 
            </div>
         <Link href={"/"}>  <span className="flex items-center justify-start font-semibold text-blue-950 dark:text-purple-500">
              Read more <AiOutlineArrowRight size={17} className='ml-1' />
             
            </span>
            </Link> 
          </div>
        </div>
      </div>
    ))}
  </div>
  {Data.length > showCount && (
                <div className="flex justify-center mt-4">
                  <button onClick={loadMore} className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-700">
                    Load More
                  </button>
                </div>
              )}
</div>
</section>
</div>
</div>
</div>
)
}

export default Page;

                 