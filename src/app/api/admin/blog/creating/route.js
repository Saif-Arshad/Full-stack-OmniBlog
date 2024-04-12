import DbConnection from "@/Mongodb/mongodb";
import BlogModel from "@/Models/Blog";

export async function POST(req) {
    try {
        const { title, category, Image, Author, Maincontent,subtitleFields  } = await req.json();
        await DbConnection();
        // console.log(subtitleFields);
        // Create an array to store the subtitle objects
        const subContentArray = [];
        
        // Iterate over each subtitle object and create a new object
        // with the required fields for your schema
        for (const subtitle of subtitleFields) {
            const { image,content } = subtitle;
            const title =subtitle.subtitle;
            // console.log(subtitle);
            // console.log(title);
            subContentArray.push({
                image,
                title,
                content
            });
        }
        
        const newBlog = await BlogModel.create({
            title,
            maincontent: Maincontent,
            author: Author,
            categorie: category,
            image: Image,
            subContent: subContentArray 
        });


        await newBlog.save();

        return new Response("Blog created successfully", { status: 200 });
    } catch (error) {
        // console.log(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
