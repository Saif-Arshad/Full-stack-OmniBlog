
import BlogModel from "@/Models/Blog";
import DbConnection from "@/Mongodb/mongodb";
import { NextResponse } from "next/server";
export async function GET(req){
    const filter1 = req.nextUrl.searchParams.get("filter1");
    let filter2 = req.nextUrl.searchParams.get("filter2");
    // console.log(filter1);
    // console.log(filter2);
    await DbConnection()
  const all =   await BlogModel.find({
    $or: [
        { "categorie": filter1 },
        { "categorie": filter2 }
      ]
  })
    return NextResponse.json({
       all
    })
}