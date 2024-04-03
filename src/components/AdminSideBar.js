import React from 'react'
import Button from "./AdminButton/Button"
import Link from 'next/link'

function AdminSideBar() {
  return (
    <div className=' w-52  bg-purple-900 flex flex-col items-center justify-center gap-y-9' >
    <Link href={"/admin/dashboard/create-blog"}>    <Button name="Create New Blog"/> </Link>
    <Link href={"/admin/dashboard/all-categories"}>  <Button name="All Categories"/></Link>   
    <Link href={"/admin/dashboard/all-posts"} > <Button name="All Blog"/></Link>   
    </div>
  )
}

export default AdminSideBar
