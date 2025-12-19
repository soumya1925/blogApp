
import { useEffect, useState } from "react";
import {type Blog } from "../types/blog";
import { getBlogs, saveBlogs } from "../utils/localStorage";
import Pagination from "../components/common/Pagination";

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  useEffect(() => setBlogs(getBlogs()), []);

  const filtered = blogs.filter(b =>
    !b.isDeleted &&
    b.title.toLowerCase().includes(search.toLowerCase()) &&
    (status ? b.status === status : true)
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const softDelete = (id: string) => {
    const updated = blogs.map(b =>
      b.id === id ? { ...b, isDeleted: true, deletedAt: new Date().toISOString() } : b
    );
    setBlogs(updated);
    saveBlogs(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold">Blogs</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            className="w-full sm:w-64 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by title"
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />

          <select
            className="w-full sm:w-40 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => { setStatus(e.target.value); setPage(1); }}
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map(blog => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow-sm border p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-semibold text-base mb-1 line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-xs text-gray-500 mb-2">
                {blog.category} • {blog.author}
              </p>

              <span
                className={`inline-block text-xs px-2 py-1 rounded-full mb-3 ${
                  blog.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {blog.status}
              </span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => softDelete(blog.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {paginated.length === 0 && (
        <div className="text-center text-sm text-gray-500 mt-10">
          No blogs found
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          total={filtered.length}
          perPage={perPage}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Blogs;
