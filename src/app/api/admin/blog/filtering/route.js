
import BlogModel from "@/Models/Blog";
import DbConnection from "@/Mongodb/mongodb";
import { NextResponse } from "next/server";
export async function GET(req){
    const filter = req.nextUrl.searchParams.get("blog");
    if(filter==="All"){
        console.log(filter);
        await DbConnection()
      const all =   await BlogModel.find({})
      return NextResponse.json({
        all
     })
    }
    else{
    console.log(filter);
    await DbConnection()
  const all =   await BlogModel.find({categorie:filter})
    return NextResponse.json({
       all
    })}
}