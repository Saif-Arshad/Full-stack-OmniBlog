import DbConnection from "@/Mongodb/mongodb";
import BlogModel from "@/Models/Blog";
import { NextResponse } from "next/server";

export async function DELETE(req){
    try {
    const id = req.nextUrl.searchParams.get("id") ;
    console.log(id)
    await DbConnection();
   const deleted =  await BlogModel.findByIdAndDelete(id);
   if(!deleted){
     return NextResponse.json({message: "Blog not found"});
   }
    return NextResponse.json({message: "Blog deleted"});
    }
    catch(err){
      console.log(err)
    }
  }