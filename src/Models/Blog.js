import mongoose from "mongoose";

const SubheadingSchema = new mongoose.Schema({
    image:{
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    content: {
        type: String,
        // required: true
    }
});

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    image:{
        type: String,
        // required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    subContent: [SubheadingSchema] 
});
const BlogModel = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default BlogModel;
