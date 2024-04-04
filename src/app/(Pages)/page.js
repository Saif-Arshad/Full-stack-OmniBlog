"use client";
import { useSearchParams } from 'next/navigation'
 
export default function Home() {
  const searchParams = useSearchParams()
  const searchUrl = searchParams.get('filter')
    console.log(searchUrl);
  return (
    <main className="flex h-5 flex-col items-center text-blue-950 bg-slate-600 justify-between p-24">
      <h1>Hello</h1>
    </main>
  );
}