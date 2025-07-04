const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.patch('/:id', auth, blogController.updateBlog);
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;
