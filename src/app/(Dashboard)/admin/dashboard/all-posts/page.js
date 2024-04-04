'use client'
import React, { useState, useEffect } from 'react';
import AdminSideBar from '@/components/AdminSideBar';
import Dropdown from '@/components/Dropdown/Dropdown';

function Page() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedCategory);
      try {
        const response = await fetch(`/api/admin/blog/filtering?blog=${selectedCategory}`);
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
  }, [selectedCategory]); // Run the effect whenever selectedCategory changes

  return (
    <div className='flex sm:ml-64'>
      <AdminSideBar />
      <div className="flex flex-col">
        <Dropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <h1>Hi, Im from all posts</h1>
      </div>
    </div>
  );
}

export default Page;
