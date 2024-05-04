
import BlogModel from "@/Models/Blog";
import DbConnection from "@/Mongodb/mongodb";
import { NextResponse } from "next/server";
export async function GET(req){
    const filter = req.nextUrl.searchParams.get("blogcategorie") ;
  try {
    await DbConnection()
    const all =   await BlogModel.find({categorie:filter})
    return NextResponse.json({
         all
      })
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
    
  }
  
}