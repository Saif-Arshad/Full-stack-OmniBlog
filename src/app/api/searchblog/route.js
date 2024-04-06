import BlogModel from "@/Models/Blog";
import DbConnection from "@/Mongodb/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const search = req.nextUrl.searchParams.get("q");
    console.log(search);

    await DbConnection();

    // Split the search query into individual words


    const words = search.split(/\s+/);

    // Construct a regular expression to match titles containing all the words


    const titleRegex = new RegExp(words.map(word => `(?=.*${word})`).join(''), 'i');

    // Perform the search in the database
    
    const searchAnswer = await BlogModel.find({ title: titleRegex });


    return NextResponse.json({
      searchAnswer
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Internal Server Error");
  }
}
