'use client'
import { useParams } from 'next/navigation';
import { useEffect,useState } from 'react';
import Loading from '@/components/Loading';
import '@/app/Stylesheets/Blog.scss'

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

<div className='flex flex-col w-full bg-white dark:bg-slate-900'>

      <div className='main-blog'>
        <h1>{data.title}</h1>
      </div>
        <h1>{data.title}</h1>
      </div>
}
        </>
    )
}
export const metadata = {
  title: `${data.title}`,
  description: `Website for blogs and have an admin dashboard where admin can see all blogs there 
  category and perform CRUD operations and all blogs are store in MongoDB Atlas.`,
};
export default Page;
