import {type Blog } from "../../types/blog";


interface Props {
blogs: Blog[];
}


const BlogTable = ({ blogs }: Props) => {
return (
<table className="w-full bg-white shadow rounded">
<thead>
<tr className="border-b">
<th className="p-2">Title</th>
<th className="p-2">Category</th>
</tr>
</thead>
<tbody>
{blogs.map(blog => (
<tr key={blog.id} className="border-b">
<td className="p-2">{blog.title}</td>
<td className="p-2">{blog.category}</td>
</tr>
))}
</tbody>
</table>
);
};


export default BlogTable;