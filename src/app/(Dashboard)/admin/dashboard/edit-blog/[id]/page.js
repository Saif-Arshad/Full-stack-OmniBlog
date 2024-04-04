'use client'
import AdminSideBar from '@/components/AdminSideBar';
import { useEffect } from 'react';

function Page(params) {
   const id =  params.params.id

useEffect(() => {
  const gettingArticles = async ()=>{
    const update= await fetch(`/api/admin/blog/update-get/${id}`)
    const updatededData = await update.json();
    console.log(updatededData);
 
}
gettingArticles();
}, [id])

    return( 
      <div className='flex sm:ml-64'>
  <AdminSideBar/>        

    <p>This Blog Page is about <span className='bg-gray-50 text-3xl'>{id}</span> </p>
      </div>
  
    )
}

export default Page;
