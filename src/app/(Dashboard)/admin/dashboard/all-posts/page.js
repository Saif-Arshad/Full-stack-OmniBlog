"use client"
import React, { useEffect, useState } from 'react';
import AdminSideBar from '@/components/AdminSideBar';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/Loading';
import { BsPencilFill } from "react-icons/bs";
import { AiOutlineDelete,AiOutlineArrowRight } from "react-icons/ai";

function Page() {
  const searchParams = useSearchParams();
  const blogUrl = searchParams.get('blog');
  const [Data, setData] = useState([]);
  const [showCount, setShowCount] = useState(4);
  const [loading,setloading] = useState(true)

  useEffect(() => {
    if (blogUrl) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${process.env.LIVE_HOST}/api/admin/blog/filtering?blog=${blogUrl}`,{
            cache: 'no-store',
          });
          
          if (!response.ok) {
            throw new Error("Failed to fetch data");
            // console.log('Failed to fetch data');
          }
          const filter = await response.json();
          setData(filter.all);
          setloading(false)
        } catch (error) {
          throw error.message
          // console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
    else{
      const fetchall = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_LIVE_HOST}/api/fetchblog`,{
            cache: 'no-store',
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const filter = await response.json();
          setData(filter.res.reverse());
          setloading(false)

        } catch (error) {
        throw error.message
        }
      };
  
      fetchall();
    }
   
  }, [blogUrl]);

  // useEffect(() => {
  //   console.log(Data);
  // }, [Data]);
      

  const DeleteNow =async (id) => {
    const confirming = confirm(`Are you sure you want to delete this article ?`);
    if (confirming) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LIVE_HOST}/api/admin/blog/deleteing?id=${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      });
      if (response.ok) {
        window.location.reload();
        // console.log('Article deleted successfully');
      } else {
        throw new Error("Failed to delete article");
      }
    } {
      
    }
  }


  const loadMore = () => {
    setShowCount(showCount + 4);
  };

  return (
    <div className="flex min-h-screen sm:ml-64 bg-white dark:bg-slate-900">
      <AdminSideBar />
      <div className="flex flex-col ">
        <div className='flex flex-wrap items-center justify-center'>
        <Dropdown />
        </div>
          <div className='w-full'>
          <section className="text-gray-600 body-font">
          <div className="container px-5 py-12 mx-auto">
      {loading ? <Loading /> :   
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
          <div className='flex justify-around sm:flex-row flex-col ml-3 sm:ml-0'>
          <h3 className='sm:ml-4 mt-4 capitalize font-semibold text-purple-600'>{data.categorie}</h3>
          <h3 className='sm:ml-4 mt-4 font-semibold text-purple-600 capitalize'>{data.author}</h3>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <p className="text-fw-normal  sm:text-xl font-bold text-black dark:text-white capitalize">
              {/* {data.title} */}
              {data.title.length > 50 ? `${data.title.substring(0, 45)}...` : data.title}

              </p>
            <p className="text-gray-500 dark:text-white">
                  {data.maincontent.length > 150 ? `${data.maincontent.substring(0, 60)}...` : data.maincontent}
         
            </p>
            <div className='flex space-x-4 flex-wrap  justify-center'>
            <Link href={`/admin/dashboard/edit-blog/${data._id}`} >
              <button className='flex items-center text-lg font-semibold text-white dark:text-purple-800 dark:bg-slate-100  bg-slate-900 py-2 px-3 rounded-xl'>
            <BsPencilFill size={16} />
            Edit
            </button>
                        </Link>
                           
                   <button onClick={()=>DeleteNow(data._id)} className= 'flex items-center text-lg font-semibold text-black dark:border-white dark:text-white border-2 py-1 border-slate-900 px-3 rounded-xl '>
                   <AiOutlineDelete size={16} />
            Delete
                      </button> 
            </div>
         <Link href={`/blog/${data._id}`}>  <span className="flex items-center justify-start font-semibold text-blue-950 dark:text-purple-500">
              Read more <AiOutlineArrowRight size={17} className='ml-1' />
             
            </span>
            </Link> 
          </div>
        </div>
      </div>
    ))}
  </div>
  }  
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
