'use client'
import { useParams } from 'next/navigation';
import { useEffect,useState } from 'react';
import Loading from '@/components/Loading';

function Page() {
  const params = useParams();
  const [data,setdata] = useState([]);
  const [loading,setloading]=useState(true)


useEffect(() => {
  const gettingArticles = async ()=>{
    const filter= await fetch(`/api/blogdata?id=${params.slug}`)
    const filteredData = await filter.json();
    console.log(filteredData);
    setdata(filteredData.blog)
    setloading(false);
 
}
gettingArticles();
}, [params])

    return( 
      <>
{ loading ? 
<div className='min-h-screen flex justify-center items-center bg-white dark:bg-slate-900'>
<Loading/> 
</div>
:

<div className='flex w-full bg-white dark:bg-slate-900'>
        <h1>{data.title}</h1>
      </div>
}
        </>
    )
}

export default Page;
