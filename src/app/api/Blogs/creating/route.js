import DbConnection from "@/Mongodb/mongodb";
import BlogModel from "@/Models/Blog";

export async function POST(req) {
    try {
        const { title, content, author, subheadings } = await req.json();
        await DbConnection();
        console.log(title, content, author, subheadings);
        const newBlog = await BlogModel.create({
            title: title,
            content: content,
            author: author,
            subContent: subheadings 
        });
        newBlog.save()
        return new Response("Blog created successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
