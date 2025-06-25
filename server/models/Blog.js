import mongoose from 'mongoose';

// Function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Summary is required'],
    maxlength: [160, 'Summary cannot exceed 160 characters'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  tags: [{
    type: String,
    trim: true
  }],
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail URL is required'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(v);
      },
      message: 'Please provide a valid image URL'
    }
  },
  author: {
    type: String,
    default: 'Lovely Associates Team',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // This will automatically manage createdAt and updatedAt
});

// Pre-save middleware to generate slug
blogSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = generateSlug(this.title);
  }
  next();
});

// Pre-update middleware to update the updatedAt field
blogSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Instance method to generate read time
blogSchema.methods.getReadTime = function() {
  if (!this.content || typeof this.content !== 'string') return null; // ✅ safe check

  const wordsPerMinute = 200;
  const wordCount = this.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

// Static method to find by slug
blogSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug: slug });
};

// Virtual for formatted date
blogSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
});

// Ensure virtual fields are serialized
blogSchema.set('toJSON', { virtuals: true });
blogSchema.set('toObject', { virtuals: true });

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;