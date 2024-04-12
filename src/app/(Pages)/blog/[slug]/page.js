'use client'
import { useParams } from 'next/navigation';
import { useEffect,useState } from 'react';
import Loading from '@/components/Loading';
import Dummy from '../../../../../public/Images/Dummy/download.jpg'
import Image from 'next/image';

function Page() {
  const params = useParams();
  const [data,setdata] = useState([]);
  const [loading,setloading]=useState(true)


useEffect(() => {
  try {
    const gettingArticles = async ()=>{
      const filter= await fetch(`${process.env.LIVE_HOST}/api/blogdata?id=${params.slug}`)
      const filteredData = await filter.json();
      setdata(filteredData.blog)
      setloading(false);
   
  }
  gettingArticles();
  } catch (error) {
    throw error.message
  }

}, [params])

    return( 
      <>
{ loading ? 
<div className='min-h-screen flex justify-center items-center bg-white dark:bg-slate-900'>
<Loading/> 
</div>
:

<div className='flex flex-col w-full bg-white dark:bg-slate-900 justify-center items-center'>
  <div className="mainContent w-10/12 lg:w-2/4 mb-8">
  <div className="Header">
         <h5 className='font-bold text-lg capitalize text-purple-800 dark:text-blue-500 mb-2'> {data.categorie} </h5>
      <h1 className='text-2xl sm:text-3xl md:text-5xl font-semibold sm:font-bold'>{data.title}</h1>
      <div className='flex flex-wrap gap-1 mt-6 items-center  text-purple-800 capitalize dark:text-blue-500 font-semibold'>

                  <Image 
                  className='rounded-xl'
                  src={Dummy}
                    height={20}
                    width={25}
                    alt={data.author}
                  >

                  </Image>
                {data.author}
                </div>

  </div>
      <div className="Maincontent mt-9 md:mt-20">

      <div className='Main-Image w-full h-full relative'>
  <Image
      src={`${data.image}`}
      alt={`${data.title}`}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }} 
    />
  
</div>
  <p className='mt-8 sm:text-lg dark:text-gray-200 md:text-xl text-start'>
    {data.maincontent}
  </p>
  <div className="subContent mt-8 cap">
    {
      data.subContent.map((subcontent,index)=>(
        <div key={index}>
          { subcontent.image?
        <div className='Main-Image w-full h-full relative my-10'>
  <Image
      src={`${subcontent.image}`}
      alt={`${subcontent.title}`}
      width={0}
      height={0}
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
    />
  
</div> : ""}
        <h1 className='font-semibold md:text-blod text-2xl md:text-3xl capitalize'>{subcontent.title}</h1>
        <p className='mt-8 sm:text-lg dark:text-gray-200 md:text-xl text-start'>
          {subcontent.content}
        </p>
        
        </div>
      ))

    }
  </div>

      </div>
  </div>
      </div>
}
        </>
    )
}
export default Page;
