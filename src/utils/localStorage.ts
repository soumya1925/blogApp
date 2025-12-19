import { type Blog } from "../types/blog";


const PURGE_DAYS = 7;


export const getBlogs = (): Blog[] => {
const raw = JSON.parse(localStorage.getItem("blogs") || "[]") as Blog[];
const now = Date.now();


const filtered = raw.filter(b => {
if (!b.isDeleted) return true;
if (!b.deletedAt) return false;
const diff = (now - new Date(b.deletedAt).getTime()) / (1000 * 60 * 60 * 24);
return diff < PURGE_DAYS;
});


localStorage.setItem("blogs", JSON.stringify(filtered));
return filtered;
};


export const saveBlogs = (blogs: Blog[]) => {
localStorage.setItem("blogs", JSON.stringify(blogs));
};