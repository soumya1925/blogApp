import { type Blog } from "../../types/blog";
import { useEffect } from "react";

interface Props {
  blog: Blog;
  onDelete: (id: string) => void;
}

const BlogCard = ({ blog, onDelete }: Props) => {
  // Add debug effect
  useEffect(() => {
    console.log('BlogCard rendering:', {
      id: blog.id,
      title: blog.title,
      hasImage: !!blog.image,
      imageLength: blog.image?.length || 0,
      imagePreview: blog.image?.substring(0, 50) + '...'
    });
  }, [blog]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Truncate description for better display
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
            Published
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Card Content */}
      <div className="p-5 pb-3 flex-1">
        {/* Header with Category and Status */}
        <div className="flex justify-between items-start mb-3">
          {/* Category */}
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full border border-blue-100">
            {blog.category || "Uncategorized"}
          </span>
          
          {/* Status Badge */}
          {getStatusBadge(blog.status)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-14">
          {blog.title || "Untitled Blog"}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3 min-h-18">
          {truncateDescription(blog.description)}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="truncate">{blog.author || "Anonymous"}</span>
          </div>
          
          {blog.publishDate && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Publish: {formatDate(blog.publishDate)}</span>
            </div>
          )}

          {blog.createdAt && (
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Created: {formatDate(blog.createdAt)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Section - Bottom of card */}
      <div className="border-t border-gray-100 mt-auto">
        {blog.image ? (
          <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden bg-gray-100">
            <img 
              src={blog.image} 
              alt={blog.title || "Blog image"}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', e);
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Cpath d='M100 120h200v60H100zM150 200h100v20H150z' fill='%23d1d5db'/%3E%3Ccircle cx='200' cy='90' r='30' fill='%23d1d5db'/%3E%3C/svg%3E";
              }}
              onLoad={() => console.log('Image loaded successfully')}
            />
            {/* Image overlay on hover - FIXED: bg-linear-to-t → bg-gradient-to-t */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                Featured Image
              </span>
            </div>
          </div>
        ) : (
          // FIXED: bg-linear-to-br → bg-gradient-to-br
          <div className="h-48 sm:h-56 md:h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm">No image uploaded</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Footer with Actions */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          {/* ID Indicator */}
          <div className="text-xs text-gray-400 font-mono truncate mr-2" title={blog.id}>
            ID: {blog.id.substring(0, 8)}...
          </div>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(blog.id)}
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 border border-red-100 shrink-0"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
        
        {/* Soft delete indicator */}
        {blog.isDeleted && blog.deletedAt && (
          <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start text-yellow-700 text-sm">
              <svg className="w-4 h-4 mr-2 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <span className="font-medium">Deleted</span>
                <p className="text-yellow-600 mt-1">
                  Will be permanently removed on {formatDate(new Date(new Date(blog.deletedAt).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString())}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;