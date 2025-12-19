import { useState } from "react";
import { validateImage } from "../../utils/validators";
import ImagePreview from "../common/ImagePreview";
import { type Blog, type BlogStatus } from "../../types/blog";

interface Props {
  initial?: Partial<Blog>;
  onSubmit: (data: Omit<Blog, "id" | "createdAt" | "isDeleted">) => void;
}

const BlogForm = ({ initial = {}, onSubmit }: Props) => {
  const [form, setForm] = useState({
    title: initial.title || "",
    description: initial.description || "",
    category: initial.category || "",
    author: initial.author || "",
    publishDate: initial.publishDate || "",
    status: (initial.status || "draft") as BlogStatus,
    image: initial.image || "",
  });

  const [imageError, setImageError] = useState<string>("");

  const onImage = (file: File) => {
    // Reset previous error
    setImageError("");

    // Validate file size (max 1MB = 1024 * 1024 bytes)
    const maxSizeInBytes = 1024 * 1024; // 1MB
    if (file.size > maxSizeInBytes) {
      const errorMsg = `Image size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the maximum allowed size of 1MB`;
      setImageError(errorMsg);
      alert(errorMsg);
      return;
    }

    // Use the existing validateImage function for other validations
    const error = validateImage(file);
    if (error) {
      setImageError(error);
      alert(error);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result as string });
      setImageError(""); // Clear error on successful upload
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // Optionally, you can check for image error before submitting
    if (imageError) {
      alert("Please fix image errors before submitting");
      return;
    }
    
    // Debug: log what's being submitted
    console.log('Form submitting:', {
      title: form.title,
      description: form.description,
      category: form.category,
      author: form.author,
      publishDate: form.publishDate,
      status: form.status,
      hasImage: !!form.image,
      imageLength: form.image?.length || 0,
      imagePreview: form.image?.substring(0, 100) + '...'
    });
    
    onSubmit(form);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {initial.title ? "Edit Blog" : "Create New Blog"}
      </h2>
      
      <div className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="Enter blog title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[120px] sm:min-h-[150px] resize-y"
            placeholder="Enter blog description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={5}
          />
        </div>

        {/* Category and Author Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              id="category"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="e.g., Technology, Lifestyle"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author
            </label>
            <input
              id="author"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Author name"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
        </div>

        {/* Publish Date and Status Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-1">
              Publish Date
            </label>
            <input
              id="publishDate"
              type="date"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={form.publishDate}
              onChange={(e) => setForm({ ...form, publishDate: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as BlogStatus })}
            >
              <option value="draft" className="py-2">Draft</option>
              <option value="published" className="py-2">Published</option>
            </select>
          </div>
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image
          </label>
          <div className="space-y-2">
            {/* Error Message Display */}
            {imageError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {imageError}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        onImage(e.target.files[0]);
                      }
                    }}
                  />
                  <div className={`px-4 py-3 border-2 border-dashed rounded-lg transition-colors bg-gray-50 ${
                    imageError ? 'border-red-300' : 'border-gray-300 hover:border-blue-400'
                  }`}>
                    <div className="text-center">
                      <div className="inline-block p-2 bg-blue-50 rounded-full mb-2">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="text-blue-500 font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to <span className="font-semibold">1MB</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {form.image && !imageError && (
                <div className="sm:w-1/3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Preview:</div>
                  <div className="relative h-40 sm:h-full">
                    <ImagePreview src={form.image} />
                    {/* Image size indicator */}
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      ✓ Image uploaded successfully
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!imageError} // Disable button if there's an image error
          >
            {initial.title ? "Update Blog" : "Publish Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;