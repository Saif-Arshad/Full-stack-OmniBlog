'use client'
import { useParams } from 'next/navigation';
import { useEffect,useState } from 'react';

function Page() {
  const params = useParams();
  const [data,setdata] = useState([]);

useEffect(() => {
  const gettingArticles = async ()=>{
    const filter= await fetch(`/api/blogdata?id=${params.slug}`)
    const filteredData = await filter.json();
    console.log(filteredData);
    setdata(filteredData.blog)
 
}
gettingArticles();
}, [params])

    return( 
      <div className='flex w-full bg-white dark:bg-slate-900'>
   
      </div>
  
    )
}

export default Page;
