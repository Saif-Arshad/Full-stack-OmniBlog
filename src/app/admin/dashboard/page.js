import AdminSideBar from '@/components/AdminSideBar'
import React from 'react'

function page() {
  return (
    <div className='flex'>
      <AdminSideBar/>
        <div className="content p-12 pt-24">
        <h1>Hello I am from admin Dashbord</h1>
        </div>
      
    </div>
  )
}

export default page
