/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
function page() {
  const param = useSearchParams();
  const urlDataone= param.get('filter1');
  const urlDatatwo= param.get('filter2');
  console.log(urlDataone);
  console.log(urlDatatwo);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/filterblog?filter1=${urlDataone}&filter2=${urlDatatwo}`);
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
  }, [urlDataone, urlDatatwo])
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  )
}

export default page
