"use client"
import AdminSideBar from '@/components/AdminSideBar'
import React from 'react'
import { useRouter } from 'next/navigation'

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const logout= async()=>{
try {
    await fetch("/api/admin/logout")
    router.push("/")
} catch (error) {
  console.log(error);
}
  }
  return (
    <div className='flex'>
      <AdminSideBar/>
        <div className="content p-12 pt-24">
        <h1>Hello I am from admin Dashbord</h1>
        <button onClick={logout} className='bg-red-700 text-white p-2'>LogOUt</button>
        </div>
      
    </div>
  )
}

export default page
