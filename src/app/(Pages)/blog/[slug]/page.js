'use client'
import AdminSideBar from '@/components/AdminSideBar';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

function Page() {
  const params = useParams();

useEffect(() => {
  const gettingArticles = async ()=>{
    const filter= await fetch(`/api/admin/blog/filtering/${params.slug}`)
    const filteredData = await filter.json();
    console.log(filteredData);
 
}
gettingArticles();
}, [params])

    return( 
      <div className='flex sm:ml-64'>
  <AdminSideBar/>        

    <p>This Blog Page is about <span className='bg-gray-50 text-3xl'>{params.slug}</span> </p>
      </div>
  
    )
}

export default Page;
