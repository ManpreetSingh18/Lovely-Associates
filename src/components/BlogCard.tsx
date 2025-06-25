import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  tags: string[];
  date: string;
  slug: string; 
  readTime: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-800 text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-800 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {post.summary}
        </p>
        
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center space-x-2 text-blue-800 font-semibold hover:text-blue-900 transition-colors group"
        >
          <span>Read More</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
export type { BlogPost };