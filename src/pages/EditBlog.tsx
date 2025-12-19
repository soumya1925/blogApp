import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {type Blog } from "../types/blog";
import { getBlogs, saveBlogs } from "../utils/localStorage";
import BlogForm from "../components/blog/BlogForm";


const EditBlog = () => {
const { id } = useParams();
const nav = useNavigate();
const [blog, setBlog] = useState<Blog | null>(null);


useEffect(() => {
const found = getBlogs().find(b => b.id === id);
if (found) setBlog(found);
}, [id]);


if (!blog) return null;


const submit = (data: any) => {
const updated = getBlogs().map(b => b.id === blog.id ? { ...b, ...data } : b);
saveBlogs(updated);
nav("/blogs");
};


return <BlogForm initial={blog} onSubmit={submit} />;
};


export default EditBlog;