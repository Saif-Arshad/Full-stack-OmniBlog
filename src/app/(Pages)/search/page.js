/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect,useState } from 'react'
import { useSearchParams } from 'next/navigation';
export default function page() {
    const searchParams = useSearchParams();
  const searchURL = searchParams.get('q');
  console.log(searchURL);
   const [data,setdata] = useState("")
  useEffect(() => {
    try {
      const fetchSearch = async () => {
        const res = await fetch(`/api/searchblog?q= ${searchURL}`,{
          cache: 'no-store',
        })
        const serverData =await res.json()
        setdata(serverData)
      }

        fetchSearch()
    } catch (error) {
        console.log(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ searchURL])
  console.log(data);
  if (!data) {
    console.log(`Could not find any blog with title ${searchURL} `)
  }
  return (
    <div>
      <h1>Hi i am {searchURL}</h1>
    </div>
  )
}
