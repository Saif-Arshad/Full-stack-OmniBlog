'use client'
import React, { useEffect } from 'react';
import AdminSideBar from '@/components/AdminSideBar';
import Dropdown from '@/components/Dropdown/Dropdown';
import { useSearchParams } from 'next/navigation'

function Page() {
  const searchParams = useSearchParams()
  const blogUrl = searchParams.get('blog')
    console.log(blogUrl);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/blog/filtering?blog=${blogUrl}`);
        if (!response.ok) {
          console.log(('Failed to fetch data'));
        }
        const filter = await response.json();
        console.log(filter);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [blogUrl]); 

  return (
    <div className='flex sm:ml-64'>
      <AdminSideBar />
      <div className="flex flex-col">
        <Dropdown/>
      </div>
    </div>
  );
}

export default Page;
