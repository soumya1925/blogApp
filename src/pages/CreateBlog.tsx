import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import BlogForm from "../components/blog/BlogForm";
import { getBlogs, saveBlogs } from "../utils/localStorage";
import { type Blog } from "../types/blog";

const CreateBlog = () => {
  const nav = useNavigate();

  const submit = (data: Omit<Blog, "id" | "createdAt" | "isDeleted">) => {
    const blogs = getBlogs();
    
    // Create new blog with proper typing
    const newBlog: Blog = {
      ...data,
      id: uuid(),
      createdAt: new Date().toISOString(),
      isDeleted: false,
    };
    
    blogs.push(newBlog);
    saveBlogs(blogs);
    nav("/blogs");
    
    // Debug: log what was saved
    console.log('Saved blog:', {
      id: newBlog.id,
      title: newBlog.title,
      hasImage: !!newBlog.image,
      imageLength: newBlog.image?.length || 0,
      imagePreview: newBlog.image?.substring(0, 50) + '...'
    });
  };

  return <BlogForm onSubmit={submit} />;
};

export default CreateBlog;