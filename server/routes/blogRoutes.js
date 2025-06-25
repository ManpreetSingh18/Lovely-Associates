import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// ✅ GET /api/blogs/tags/all - Get all unique tags
// (Moved before /:slug to avoid being caught as a slug route)
router.get('/tags/all', async (req, res) => {
  try {
    const tags = await Blog.distinct('tags');
    res.json({ tags: tags.sort() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET /api/blogs - Get all blogs with optional filtering
router.get('/', async (req, res) => {
  try {
    const { tag, search } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    let query = {};

    if (tag && tag !== 'All') {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-content');

    const total = await Blog.countDocuments(query);

    res.json({
      blogs: blogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        slug: blog.slug,
        summary: blog.summary,
        thumbnail: blog.thumbnail,
        tags: blog.tags,
        author: blog.author,
        date: blog.formattedDate || blog.createdAt.toDateString(),
        readTime: blog.getReadTime?.() || null,
        createdAt: blog.createdAt
      })),
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET /api/blogs/:slug - Get single blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({
      id: blog._id,
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary,
      content: blog.content,
      thumbnail: blog.thumbnail,
      tags: blog.tags,
      author: blog.author,
      date: blog.formattedDate || blog.createdAt.toDateString(),
      readTime: blog.getReadTime?.() || null,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/blogs - Create new blog
router.post('/', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();

    res.status(201).json({
      message: 'Blog created successfully',
      blog: {
        id: savedBlog._id,
        title: savedBlog.title,
        slug: savedBlog.slug,
        summary: savedBlog.summary,
        content: savedBlog.content,
        thumbnail: savedBlog.thumbnail,
        tags: savedBlog.tags,
        author: savedBlog.author,
        date: savedBlog.formattedDate || savedBlog.createdAt.toDateString(),
        readTime: savedBlog.getReadTime?.() || null,
        createdAt: savedBlog.createdAt
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/blogs/:slug - Update blog by slug
router.put('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({
      message: 'Blog updated successfully',
      blog: {
        id: blog._id,
        title: blog.title,
        slug: blog.slug,
        summary: blog.summary,
        content: blog.content,
        thumbnail: blog.thumbnail,
        tags: blog.tags,
        author: blog.author,
        date: blog.formattedDate || blog.createdAt.toDateString(),
        readTime: blog.getReadTime?.() || null,
        createdAt: blog.createdAt,
        updatedAt: blog.updatedAt
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/blogs/:slug - Delete blog by slug
router.delete('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
