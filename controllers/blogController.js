const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            ...req.body,
            author: req.user._id,
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username nom prenom').sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog non trouvé' });
        res.json(blog);
    } catch (error) {
        res.status(400).json({ error: 'ID invalide' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog non trouvé' });

        if (blog.author.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Accès refusé" });

        Object.assign(blog, req.body);
        await blog.save();
        res.json({ message: "Blog mis à jour", blog });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog non trouvé' });

        if (blog.author.toString() !== req.user._id.toString())
            return res.status(403).json({ message: "Accès refusé" });

        await blog.deleteOne();
        res.json({ message: 'Blog supprimé' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
