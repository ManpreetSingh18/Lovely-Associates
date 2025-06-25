import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, AlertCircle, Loader, Image, Tag, FileText } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { isAuthenticated } from '../../utils/auth';
;
const API_URL = import.meta.env.VITE_API_URL;

interface BlogFormData {
  title: string;
  summary: string;
  tags: string;
  thumbnail: string;
  content: string;
}

interface BlogFormProps {
  mode: 'create' | 'edit';
}

const BlogForm: React.FC<BlogFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    summary: '',
    tags: '',
    thumbnail: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Load existing post data for edit mode
  useEffect(() => {
    if (mode === 'edit' && id) {
      loadPost();
    }
  }, [mode, id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try to fetch by ID first, then by slug if that fails
      let response = await fetch(`${API_URL}/api/blogs/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to load post');
      }

      const post = await response.json();
      
      setFormData({
        title: post.title || '',
        summary: post.summary || '',
        tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
        thumbnail: post.thumbnail || '',
        content: post.content || ''
      });
      
      // Store original slug for API calls
      setOriginalSlug(post.slug || id);
      
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Failed to load post data. Please check if the post exists.');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleInputChange = (field: keyof BlogFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.summary.trim()) {
      setError('Summary is required');
      return false;
    }
    if (formData.summary.length > 160) {
      setError('Summary must be 160 characters or less');
      return false;
    }
    if (!formData.thumbnail.trim()) {
      setError('Thumbnail URL is required');
      return false;
    }
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      setError('Content is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError('');

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const postData = {
        title: formData.title.trim(),
        summary: formData.summary.trim(),
        tags: tagsArray,
        thumbnail: formData.thumbnail.trim(),
        content: formData.content
      };

      let url: string;
      let method: string;

      if (mode === 'create') {
        url = `${API_URL}/api/blogs`;
        method = 'POST';
      } else {
        // For edit mode, use the original slug or ID
        const identifier = originalSlug || id;
        url = `${API_URL}/api/blogs/${identifier}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to ${mode} post`);
      }

      const result = await response.json();
      
      // Show success message and redirect
      alert(`Blog post ${mode === 'create' ? 'created' : 'updated'} successfully!`);
      navigate('/admin/dashboard');
      
    } catch (err) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} post:`, err);
      setError(err instanceof Error ? err.message : `Failed to ${mode} post`);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    if (!validateForm()) {
      return;
    }
    setPreviewMode(!previewMode);
  };

  // Quill editor configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'image'
  ];

  if (!isAuthenticated()) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading post...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-bold text-gray-900">
                {mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handlePreview}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                type="submit"
                form="blog-form"
                disabled={saving}
                className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>{mode === 'create' ? 'Publish' : 'Update'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
            {mode === 'edit' && (
              <button
                onClick={loadPost}
                className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {previewMode ? (
          /* Preview Mode */
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-64">
              <img
                src={formData.thumbnail || 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={formData.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.tags.split(',').map((tag, index) => (
                  tag.trim() && (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag.trim()}</span>
                    </span>
                  )
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{formData.summary}</p>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Post Details</span>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Title */}
                <div className="lg:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter blog post title..."
                    required
                  />
                  {formData.title && (
                    <p className="mt-1 text-sm text-gray-500">
                      Slug: {generateSlug(formData.title)}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Real Estate, Delhi, Investment"
                  />
                  <p className="mt-1 text-sm text-gray-500">Separate tags with commas</p>
                </div>

                {/* Thumbnail URL */}
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail URL *
                  </label>
                  <div className="relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      id="thumbnail"
                      value={formData.thumbnail}
                      onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                  {formData.thumbnail && (
                    <div className="mt-2">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Summary */}
                <div className="lg:col-span-2">
                  <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                    Summary * ({formData.summary.length}/160)
                  </label>
                  <textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    rows={3}
                    maxLength={160}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                      formData.summary.length > 140 
                        ? formData.summary.length > 160 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-yellow-300 bg-yellow-50'
                        : 'border-gray-300'
                    }`}
                    placeholder="Brief description of the blog post (max 160 characters)..."
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-gray-500">
                      This will be used as the meta description and preview text
                    </p>
                    <span className={`text-sm ${
                      formData.summary.length > 140 
                        ? formData.summary.length > 160 
                          ? 'text-red-600 font-medium' 
                          : 'text-yellow-600 font-medium'
                        : 'text-gray-500'
                    }`}>
                      {formData.summary.length}/160
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Content *</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => handleInputChange('content', content)}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your blog post content here..."
                  style={{ minHeight: '400px' }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Use the toolbar above to format your content. You can add headings, lists, links, and images.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (mode === 'create' ? 'Publish' : 'Update')}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogForm;